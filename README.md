# Secure Google Sheets Dashboard

A production-ready, secure web application that displays live data from Google Sheets with full authentication and read-only access. Built with React, Firebase Authentication, and Firebase Functions.

## 🚀 Features

- ✅ **Full Authentication Flow**: Login, Sign Up, Password Reset
- ✅ **Secure Data Access**: Firebase Functions with service account authentication
- ✅ **Read-Only Access**: Users cannot edit or access Google Sheets directly
- ✅ **Real-Time Updates**: Data refreshes from Google Sheets
- ✅ **Protected Routes**: Authentication required for all data access
- ✅ **Modern UI**: Responsive design for desktop and mobile
- ✅ **GitHub Pages Ready**: Static hosting with serverless backend

## 📋 Prerequisites

- Node.js 18+ installed
- Firebase account (free tier works)
- Google Cloud Platform account
- GitHub account
- Your Google Sheet ready

## 🛠️ Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project is already created: **sheets2-60985**
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider
4. Note: Your Firebase config is already set in `.env`

### 2. Google Sheets API Setup

#### Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (sheets2-60985)
3. Go to "APIs & Services" → "Library"
4. Search for "Google Sheets API"
5. Click "Enable"

#### Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `sheets-reader`
4. Click "Create and Continue"
5. Grant role: "Viewer" (or no role needed)
6. Click "Done"

#### Get Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Download the JSON file
6. **Keep this file secure - never commit it to Git**

#### Share Google Sheet with Service Account

1. Open the JSON key file
2. Find the `client_email` field (looks like: `sheets-reader@sheets2-60985.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click "Share"
5. Paste the service account email
6. Give "Viewer" permission
7. Uncheck "Notify people"
8. Click "Share"

#### Get Your Sheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```
Copy the `SHEET_ID_HERE` part.

### 3. Local Environment Setup

#### Clone and Install Dependencies

```bash
cd sheets-dashboard-app

# Install frontend dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

#### Configure Environment Variables

The `.env` file is already created with your Firebase config. You're all set for the frontend!

#### Configure Firebase Functions

1. Place your service account JSON file in the `functions` folder
2. Rename it to `service-account-key.json`
3. Update `functions/.gitignore` to ensure it's not committed

Or use Firebase environment config (recommended):

```bash
# Set the Sheet ID
firebase functions:config:set sheets.id="YOUR_SHEET_ID"

# Set the range (optional, defaults to Sheet1!A1:Z1000)
firebase functions:config:set sheets.range="Sheet1!A1:Z1000"
```

Then update [functions/index.js](functions/index.js#L51):
```javascript
const spreadsheetId = functions.config().sheets.id
const range = functions.config().sheets.range || 'Sheet1!A1:Z1000'
```

### 4. Deploy Firebase Functions

#### Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### Login to Firebase

```bash
firebase login
```

#### Deploy Functions

```bash
# Deploy only functions
firebase deploy --only functions
```

After deployment, you'll see output like:
```
✔  functions: Finished running predeploy script.
✔  functions[getSheetData(us-central1)]: Successful create operation.
Function URL (getSheetData): https://us-central1-sheets2-60985.cloudfunctions.net/getSheetData
```

The Functions URL is already configured in your `.env` file!

### 5. Test Locally

```bash
# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### 6. Deploy to GitHub Pages

#### Update Repository Name

1. Edit [vite.config.js](vite.config.js#L7):
   ```javascript
   base: '/YOUR-REPO-NAME/', // Replace with your actual GitHub repo name
   ```

2. Edit [src/App.jsx](src/App.jsx#L10):
   ```javascript
   <BrowserRouter basename="/YOUR-REPO-NAME">
   ```

#### Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Secure Sheets Dashboard"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to main
git branch -M main
git push -u origin main
```

#### Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build the production app
2. Push the `dist` folder to the `gh-pages` branch
3. GitHub Pages will automatically serve it

#### Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings"
3. Go to "Pages" (left sidebar)
4. Source: Select `gh-pages` branch
5. Folder: `/ (root)`
6. Click "Save"

Your app will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 🔒 Security Features

### Authentication
- Firebase Authentication with email/password
- Protected routes - unauthenticated users redirected to login
- Secure session management

### Data Access
- **No direct Google Sheets access** - URL never exposed to frontend
- Firebase Functions act as secure intermediary
- Service account with read-only permissions
- ID token verification on every request
- CORS protection

### API Security
- All requests require valid Firebase ID token
- Token verification via Firebase Admin SDK
- Service account credentials secured in Firebase environment
- Read-only Google Sheets API scope

## 📱 Usage

1. **Sign Up**: Create an account with email/password
2. **Login**: Access your dashboard
3. **View Data**: See live data from your Google Sheet
4. **Refresh**: Click refresh button to update data
5. **Logout**: Securely end your session

## 🎨 Customization

### Update Branding

Edit [src/index.css](src/index.css) to change:
- Colors (CSS variables at top)
- Fonts
- Layout

### Modify Data Display

Edit [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx) to:
- Add filtering
- Add sorting
- Change table layout
- Add charts/graphs

### Change Sheet Range

Edit [functions/index.js](functions/index.js#L52):
```javascript
const range = 'Sheet1!A1:Z1000' // Modify range here
```

## 📁 Project Structure

```
sheets-dashboard-app/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   └── ProtectedRoute.jsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx              # Main app component
│   ├── firebase.js          # Firebase configuration
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── functions/               # Firebase Functions
│   ├── index.js            # Cloud function code
│   └── package.json
├── .env                     # Environment variables (git ignored)
├── .env.example            # Environment template
├── firebase.json           # Firebase configuration
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## 🐛 Troubleshooting

### Authentication Issues

**"No token provided"**
- Check that `.env` file has correct Firebase config
- Ensure you're logged in
- Try logging out and back in

**"Invalid token"**
- Token may have expired - log out and log back in
- Check Firebase Authentication is enabled

### Data Loading Issues

**"Failed to load data"**
- Check Firebase Function deployed successfully
- Verify service account has access to Google Sheet
- Check Google Sheets API is enabled
- Verify Sheet ID is correct

**"No data available"**
- Check your Google Sheet has data
- Verify the range is correct
- Check first row contains headers

### Deployment Issues

**GitHub Pages 404 error**
- Check `base` in `vite.config.js` matches repo name
- Check `basename` in `App.jsx` matches repo name
- Ensure GitHub Pages is enabled for `gh-pages` branch

**Functions deployment fails**
- Ensure Firebase CLI is logged in: `firebase login`
- Check Node.js version is 18+
- Verify you're in the project root directory

## 🔄 Updates and Maintenance

### Update Dependencies

```bash
# Frontend
npm update

# Functions
cd functions
npm update
cd ..
```

### Redeploy After Changes

```bash
# Frontend only
npm run deploy

# Functions only
firebase deploy --only functions

# Both
npm run build
firebase deploy
```

## 📝 Environment Variables Reference

### Frontend (.env)
```bash
VITE_FIREBASE_API_KEY=          # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN=      # Firebase auth domain
VITE_FIREBASE_PROJECT_ID=       # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET=   # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID= # Firebase messaging sender ID
VITE_FIREBASE_APP_ID=           # Firebase app ID
VITE_FUNCTIONS_URL=             # Cloud Functions base URL
```

### Backend (Firebase Config)
```bash
sheets.id=     # Google Sheet ID
sheets.range=  # Sheet range (e.g., Sheet1!A1:Z1000)
```

## 🎯 Next Steps

- [ ] Add data filtering and search
- [ ] Implement data export (CSV/PDF)
- [ ] Add user roles and permissions
- [ ] Create admin panel
- [ ] Add data visualization (charts)
- [ ] Implement caching for better performance
- [ ] Add multiple sheet support
- [ ] Create mobile app version

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Firebase Console for errors
3. Check browser console for client-side errors
4. Review Cloud Functions logs: `firebase functions:log`

---

**Built with React, Firebase, and ❤️**
