# OLX Marketplace (Responsive UI Refresh)

This project keeps the original Create React App, React Router v5, Firebase Authentication, Cloud Firestore, and Firebase Storage setup while refreshing the interface and improving listing/search flows.

## Requirements
- Node.js compatible with the installed Create React App 4 toolchain
- npm

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000/olx/ if running with the GitHub Pages basename; for local testing you can change `basename="/olx"` in `src/App.js` to `basename=""` temporarily.

## Build for GitHub Pages
```bash
npm run build
npm run deploy
```
The configured homepage is `https://antokochumon.github.io/olx`.

## Firebase
The frontend reads product listings from Firestore `products`, looks up seller profiles in `users`, uses Firebase Authentication for accounts, and Firebase Storage for listing photos. Firebase security rules and the existing Firebase project configuration are not changed by this UI refresh. Verify that the project has appropriate Firestore and Storage rules before production use.

## Improvements included
- Responsive layout for desktop, tablet, and mobile
- Updated header, search fields, category filters, listing cards, forms, and details page
- Live Firestore listing updates, loading/error/empty states
- Working text/location search and category filtering
- Client-side favourites (not persisted to an account)
- Form validation, image preview, upload progress state, and user-facing errors
- Fixed auth state listener cleanup and duplicate header on create page

Note: this is a frontend redesign. No backend, database schema, existing Firebase project, or product records were replaced.
