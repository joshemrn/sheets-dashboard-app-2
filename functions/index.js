const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { google } = require('googleapis')
const cors = require('cors')({ origin: true })

// Initialize Firebase Admin
admin.initializeApp()

/**
 * Cloud Function to fetch Google Sheets data
 * Requires authentication and enforces read-only access
 */
exports.getSheetData = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  return cors(req, res, async () => {
    try {
      // Only allow GET requests
      if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
      }

      // Verify Firebase Authentication token
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' })
      }

      const idToken = authHeader.split('Bearer ')[1]

      try {
        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        console.log('Authenticated user:', decodedToken.uid)
      } catch (error) {
        console.error('Token verification failed:', error)
        return res.status(401).json({ error: 'Unauthorized - Invalid token' })
      }

      // Configure Google Sheets API with service account key file
      const auth = new google.auth.GoogleAuth({
        keyFile: './service-account-key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
      })

      const sheets = google.sheets({ version: 'v4', auth })

      // Get Sheet ID from environment
      const spreadsheetId = process.env.GOOGLE_SHEET_ID

      if (!spreadsheetId) {
        return res.status(500).json({
          error: 'Server configuration error - Sheet ID not set'
        })
      }

      // Get range from environment or use default
      const range = process.env.SHEET_RANGE || 'Sheet1!A1:Z1000'

      // Fetch data from Google Sheets (READ-ONLY)
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      })

      const rows = response.data.values

      if (!rows || rows.length === 0) {
        return res.json({ data: [] })
      }

      // Convert rows to array of objects
      // First row is headers
      const headers = rows[0]
      const data = rows.slice(1).map(row => {
        const obj = {}
        headers.forEach((header, index) => {
          obj[header] = row[index] || ''
        })
        return obj
      })

      // Return the data
      return res.json({
        data,
        lastUpdated: new Date().toISOString()
      })

    } catch (error) {
      console.error('Error fetching sheet data:', error)
      return res.status(500).json({
        error: 'Failed to fetch data',
        message: error.message
      })
    }
  })
})
