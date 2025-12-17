# GitHub Actions Setup

To enable automatic deployments on every push to `main`:

## 1. Add Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add each of these secrets:

### VITE_FIREBASE_API_KEY
```
AIzaSyChcZ4fufen7eqF1twTYS0ZaIRq923l90Q
```

### VITE_FIREBASE_AUTH_DOMAIN
```
sheets2-60985.firebaseapp.com
```

### VITE_FIREBASE_PROJECT_ID
```
sheets2-60985
```

### VITE_FIREBASE_STORAGE_BUCKET
```
sheets2-60985.firebasestorage.app
```

### VITE_FIREBASE_MESSAGING_SENDER_ID
```
948545360110
```

### VITE_FIREBASE_APP_ID
```
1:948545360110:web:94a3b70de6abec405ce3ff
```

### VITE_FUNCTIONS_URL
```
https://us-central1-sheets2-60985.cloudfunctions.net
```

## 2. Push to Main Branch

Once secrets are configured, every push to `main` will automatically:
1. Build the app with production settings
2. Deploy to GitHub Pages

## 3. Manual Deployment

You can also trigger deployment manually:
- Go to Actions tab
- Click "Deploy to GitHub Pages"
- Click "Run workflow"

## Benefits

- ✅ Automatic deployment on push
- ✅ Secrets secured in GitHub
- ✅ No need to run `npm run deploy` locally
- ✅ Consistent builds
- ✅ Deployment history in Actions tab

## Alternative: Local Deployment

If you prefer local deployment, continue using:
```bash
npm run deploy
```

This is already configured and works fine!
