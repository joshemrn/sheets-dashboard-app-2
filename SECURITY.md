# Security Policy

## Sensitive Files - DO NOT COMMIT

The following files contain sensitive information and should NEVER be committed to version control:

### Frontend
- `.env` - Contains Firebase configuration (already in .gitignore)
- `.env.local` - Local environment overrides
- `.env.production` - Production environment variables

### Backend (Firebase Functions)
- `functions/service-account-key.json` - Google Cloud service account credentials
- `functions/.env` - Function environment variables
- Any files containing API keys or secrets

## Best Practices

### 1. Environment Variables
- ✅ Use `.env.example` as template (safe to commit)
- ✅ Copy to `.env` and add real values (never commit)
- ✅ Use Firebase environment config for Functions secrets

### 2. Service Account Security
```bash
# NEVER do this:
git add functions/service-account-key.json

# Instead, use Firebase config:
firebase functions:config:set google.credentials="$(cat service-account-key.json)"
```

### 3. Firebase API Keys
Firebase API keys in `.env` are safe for client-side use because:
- They identify your Firebase project
- Security is enforced by Firebase Security Rules
- Authentication is required for data access

However, still keep them in `.env` (not committed) as best practice.

### 4. What to Check Before Committing

```bash
# Check what files you're about to commit
git status

# Make sure none of these are listed:
# ❌ .env
# ❌ service-account-key.json
# ❌ Any file with passwords/keys
```

### 5. If You Accidentally Commit Secrets

1. **Immediately rotate all credentials**:
   - Regenerate Firebase API keys
   - Create new service account
   - Update Firebase Functions config

2. **Remove from Git history**:
   ```bash
   # Remove file from all commits
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push to remote
   git push origin --force --all
   ```

3. **Better: Use BFG Repo-Cleaner**:
   ```bash
   # Install BFG
   # Then run:
   bfg --delete-files .env
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```

## Reporting a Vulnerability

If you discover a security vulnerability:
1. **DO NOT** create a public GitHub issue
2. Email the repository owner privately
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Checklist

- [x] `.env` in .gitignore
- [x] Service account JSON in .gitignore
- [x] Functions use environment config for secrets
- [x] CORS enabled on Cloud Functions
- [x] Firebase ID token verification on all requests
- [x] Read-only Google Sheets API scope
- [x] Protected routes require authentication
- [x] No sensitive data in client-side code

## Updates

Keep dependencies updated to patch security vulnerabilities:

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

**Remember: When in doubt, don't commit it. Rotate credentials if you're unsure.**
