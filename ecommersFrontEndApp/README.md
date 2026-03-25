# E-Shop Frontend

React-based frontend for the E-Shop Portal, built with Vite.

## 1. Project Overview
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 7
- **HTTP Client**: Axios

## 2. Setup Steps
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start dev server:
    ```bash
    npm run dev
    ```

## 3. API Details
Connects to the backend at `http://localhost:8081` (configurable in `src/services/api.jsx`).

## 4. SSO Configuration
Uses custom OAuth2 redirect handling in `OAuth2RedirectHandler.jsx`.
