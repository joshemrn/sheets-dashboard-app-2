# Quick Reference Card

## 🔥 Essential Commands

### Development
```bash
npm run dev              # Start dev server → http://localhost:5173
npm run build           # Build for production
npm run preview         # Preview production build
```

### Firebase
```bash
firebase login                    # Login to Firebase
firebase deploy --only functions  # Deploy Cloud Functions only
firebase functions:log           # View function logs
firebase functions:config:get    # View environment config
```

### Deployment
```bash
npm run deploy          # Build + deploy to GitHub Pages
git push origin main    # Push code (triggers auto-deploy if Actions configured)
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env` | Frontend environment variables (not committed) |
| `src/firebase.js` | Firebase initialization |
| `src/contexts/AuthContext.jsx` | Authentication logic |
| `src/pages/Dashboard.jsx` | Main data display |
| `functions/index.js` | Backend Cloud Function |
| `vite.config.js` | Build configuration |
| `firebase.json` | Firebase project config |

## 🔑 Environment Variables

### Frontend (.env)
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FUNCTIONS_URL=
```

### Functions (Firebase Config)
```bash
firebase functions:config:set sheets.id="YOUR_SHEET_ID"
firebase functions:config:set sheets.range="Sheet1!A1:Z1000"
```

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Firebase Console | https://console.firebase.google.com/project/sheets2-60985 |
| Google Cloud Console | https://console.cloud.google.com/ |
| Functions URL | https://us-central1-sheets2-60985.cloudfunctions.net |
| Local Dev | http://localhost:5173 |
| GitHub Pages | https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/ |

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "No token provided" | Log out and log back in |
| "Failed to fetch data" | Check function logs: `firebase functions:log` |
| Function not found | Redeploy: `firebase deploy --only functions` |
| 404 on GitHub Pages | Check `base` in vite.config.js matches repo name |
| CORS error | Check Functions CORS configuration |
| Build fails | Delete node_modules, run `npm install` |

## 📊 Project Structure

```
sheets-dashboard-app/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts (auth)
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app
│   ├── firebase.js     # Firebase config
│   └── index.css       # Global styles
├── functions/
│   ├── index.js        # Cloud Function
│   └── package.json    # Function dependencies
├── .env                # Environment variables
├── package.json        # Frontend dependencies
└── firebase.json       # Firebase configuration
```

## 🎯 Common Tasks

### Add a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Link from existing page

### Update Sheet Range
```javascript
// Edit functions/index.js line ~52
const range = 'Sheet1!A1:Z1000' // Change here
```

### Change Colors/Styling
```css
/* Edit src/index.css - CSS variables at top */
:root {
  --primary-color: #4f46e5;  /* Change this */
}
```

### Add Authentication Provider (Google, etc.)
1. Enable in Firebase Console → Authentication
2. Update `src/contexts/AuthContext.jsx`
3. Add button in Login page

## 🔒 Security Checklist

- [ ] `.env` not committed
- [ ] Service account JSON not committed
- [ ] Firebase Authentication enabled
- [ ] Sheet shared with service account
- [ ] CORS configured in Functions
- [ ] HTTPS only (enforced by Firebase/GitHub)

## 📱 Testing Checklist

- [ ] Sign up works
- [ ] Login works
- [ ] Forgot password works
- [ ] Dashboard loads data
- [ ] Refresh button works
- [ ] Logout works
- [ ] Responsive on mobile
- [ ] Protected routes redirect

## 🚀 Deployment Checklist

- [ ] Update `vite.config.js` base path
- [ ] Update `App.jsx` basename
- [ ] Functions deployed
- [ ] GitHub repo created
- [ ] Code pushed to main
- [ ] GitHub Pages enabled
- [ ] Test live URL

## 📞 Support Resources

- Firebase Docs: https://firebase.google.com/docs
- React Router: https://reactrouter.com
- Vite Docs: https://vitejs.dev
- Google Sheets API: https://developers.google.com/sheets/api

## 💡 Pro Tips

- Use `firebase emulators:start` to test Functions locally
- Check browser DevTools Console for client errors
- Use `firebase functions:log` for backend errors
- Test on mobile browsers, not just desktop
- Enable email verification in production
- Add loading states for better UX
- Implement error boundaries in React

---

**Keep this card handy for quick reference!**
