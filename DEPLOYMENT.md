# Quick Deployment Guide

## 🚀 Fast Track Setup (15 minutes)

### Step 1: Install Dependencies (2 min)
```bash
cd sheets-dashboard-app
npm install
cd functions
npm install
cd ..
```

### Step 2: Google Sheets API Setup (5 min)

1. **Enable API**: https://console.cloud.google.com/apis/library/sheets.googleapis.com
2. **Create Service Account**:
   - Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
   - Project: sheets2-60985
   - Create → Name: "sheets-reader" → Create
   - Skip permissions → Done
3. **Get JSON Key**:
   - Click on service account → Keys → Add Key → JSON
   - Download and save (keep secure!)
4. **Share Sheet**:
   - Open service account JSON → Copy `client_email`
   - Open your Google Sheet → Share
   - Paste email → Viewer access → Share

### Step 3: Configure Functions (3 min)

**Option A: Using Environment Config (Recommended)**
```bash
# Login to Firebase
firebase login

# Set your Sheet ID
firebase functions:config:set sheets.id="YOUR_SHEET_ID_HERE"

# Optional: Set custom range
firebase functions:config:set sheets.range="Sheet1!A1:Z1000"
```

**Option B: Using Service Account File**
1. Move downloaded JSON to: `functions/service-account-key.json`
2. Update `functions/index.js` line 31:
```javascript
const auth = new google.auth.GoogleAuth({
  keyFile: './service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
})
```

### Step 4: Deploy Functions (2 min)
```bash
firebase deploy --only functions
```

✅ Functions URL: `https://us-central1-sheets2-60985.cloudfunctions.net`

### Step 5: Test Locally (1 min)
```bash
npm run dev
```
Open: http://localhost:5173

### Step 6: Deploy to GitHub Pages (2 min)

1. **Update config files** (replace `YOUR-REPO-NAME`):

`vite.config.js`:
```javascript
base: '/YOUR-REPO-NAME/',
```

`src/App.jsx`:
```javascript
<BrowserRouter basename="/YOUR-REPO-NAME">
```

2. **Deploy**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
npm run deploy
```

3. **Enable GitHub Pages**:
   - Repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

✅ Live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## 🔧 Common Issues & Quick Fixes

### "Failed to fetch data"
```bash
# Check Function deployed
firebase functions:log

# Verify Sheet ID
firebase functions:config:get

# Check service account has access to sheet
```

### "Unauthorized - Invalid token"
- Log out and log back in
- Check Firebase Authentication is enabled (Console → Authentication)

### GitHub Pages 404
```bash
# Fix base paths in:
# - vite.config.js
# - src/App.jsx
# Then redeploy:
npm run deploy
```

---

## 📋 Checklist

- [ ] Dependencies installed
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] Sheet shared with service account
- [ ] Functions configured (Sheet ID set)
- [ ] Functions deployed successfully
- [ ] App tested locally
- [ ] Repository created on GitHub
- [ ] Config files updated with repo name
- [ ] Deployed to GitHub Pages
- [ ] GitHub Pages enabled

---

## 🎯 What You Should See

### After Local Test
- Login page with purple gradient
- Can create account
- Can log in
- Dashboard shows sheet data
- Refresh button works

### After GitHub Pages Deploy
- Live URL accessible
- Authentication works
- Data loads from Functions
- Responsive on mobile

---

## 📞 Getting Sheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                         This is your Sheet ID
```

---

## 🔐 Security Reminder

**NEVER commit these files:**
- `.env`
- `functions/service-account-key.json`

They're in `.gitignore` but double-check before pushing!

---

**Need help?** Check the full README.md for detailed instructions.
