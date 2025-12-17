# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICE                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React SPA (GitHub Pages)                    │  │
│  │                                                          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌─────────────────┐   │  │
│  │  │   Login    │  │  Sign Up   │  │ Forgot Password │   │  │
│  │  └────────────┘  └────────────┘  └─────────────────┘   │  │
│  │                                                          │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │          Dashboard (Protected Route)             │  │  │
│  │  │  - Display Sheet Data                            │  │  │
│  │  │  - Refresh Button                                │  │  │
│  │  │  - Logout                                         │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Firebase Services (Google Cloud)             │
│                                                                 │
│  ┌───────────────────────┐      ┌──────────────────────────┐   │
│  │  Firebase Auth        │      │  Firebase Functions      │   │
│  │                       │      │                          │   │
│  │  - Email/Password     │◄────►│  getSheetData()          │   │
│  │  - User Management    │      │  - Verify ID Token       │   │
│  │  - Token Generation   │      │  - Call Sheets API       │   │
│  │                       │      │  - Return Data           │   │
│  └───────────────────────┘      └──────────────────────────┘   │
│                                            │                    │
│                                            │ Service Account    │
│                                            │ (Read-Only)        │
│                                            ▼                    │
│                                  ┌──────────────────────────┐   │
│                                  │  Google Sheets API       │   │
│                                  │                          │   │
│                                  │  - Fetch Sheet Data      │   │
│                                  │  - Read-Only Access      │   │
│                                  └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
                              ┌──────────────────────────┐
                              │    Google Sheets         │
                              │    (Your Data Source)    │
                              └──────────────────────────┘
```

## Authentication Flow

```
User                    React App              Firebase Auth
  │                         │                         │
  │─ Enter Email/Password ─►│                         │
  │                         │─ signIn(email, pass) ──►│
  │                         │                         │
  │                         │◄─ ID Token ─────────────│
  │◄─ Redirect to Dashboard │                         │
  │                         │                         │
```

## Data Fetching Flow

```
Dashboard         Firebase Functions      Sheets API      Google Sheet
    │                     │                    │               │
    │─ GET /getSheetData ►│                    │               │
    │  (with ID Token)    │                    │               │
    │                     │─ Verify Token      │               │
    │                     │                    │               │
    │                     │─ Authenticate ────►│               │
    │                     │  (Service Account) │               │
    │                     │                    │               │
    │                     │                    │─ Read Data ──►│
    │                     │                    │               │
    │                     │◄─ Sheet Data ──────│               │
    │                     │                    │               │
    │◄─ JSON Response ────│                    │               │
    │                     │                    │               │
```

## Security Layers

### Layer 1: Authentication
- Firebase Authentication required
- No anonymous access
- Email verification available

### Layer 2: Route Protection
- React Router Protected Routes
- Automatic redirect to login
- Session persistence

### Layer 3: API Security
- ID Token verification on every request
- CORS protection
- Rate limiting (Firebase built-in)

### Layer 4: Data Access
- Service Account (not user credentials)
- Read-only Sheets API scope
- No direct Sheet URL exposure

### Layer 5: Environment Security
- Secrets in environment variables
- Service account keys secured
- No credentials in client code

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Router**: React Router 6
- **Auth**: Firebase Auth SDK
- **Styling**: Plain CSS (CSS Variables)
- **Hosting**: GitHub Pages

### Backend
- **Platform**: Firebase Functions (Node.js 18)
- **Runtime**: Serverless (Google Cloud)
- **Auth**: Firebase Admin SDK
- **API**: Google Sheets API v4
- **CORS**: cors middleware

### Infrastructure
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions (optional)
- **DNS**: GitHub Pages (optional custom domain)

## Data Flow Summary

1. **User signs up/logs in** → Firebase Auth creates user → ID token issued
2. **User accesses dashboard** → Protected route checks authentication
3. **Dashboard loads** → Fetches data from Firebase Function
4. **Function receives request** → Verifies ID token → Authenticates with Sheets API
5. **Sheets API** → Returns data → Function formats → Sends to dashboard
6. **Dashboard displays** → User sees read-only data → Can refresh

## Deployment Pipeline

```
Developer                GitHub              GitHub Pages
    │                       │                       │
    │─ git push main ──────►│                       │
    │                       │                       │
    │                       │─ GitHub Actions       │
    │                       │  1. npm install       │
    │                       │  2. npm run build     │
    │                       │  3. Deploy to gh-pages│
    │                       │                       │
    │                       │──────────────────────►│
    │                       │                       │
    │                       │                   Live Site
```

## Cost Breakdown (Free Tier)

- **GitHub Pages**: Free
- **Firebase Auth**: 50,000 MAU free
- **Firebase Functions**: 2M invocations/month free
- **Google Sheets API**: 300 requests/min free
- **Total**: $0/month for small-medium usage

## Scalability

### Current Setup Handles:
- Up to 50,000 monthly active users (Firebase)
- Up to 2 million API calls/month (Functions)
- Unlimited page views (GitHub Pages)
- 300 Sheet API requests/minute

### To Scale Beyond:
- Add Redis/Firestore caching
- Implement request batching
- Use Firebase paid tier
- Add CDN for static assets
- Implement data pagination
