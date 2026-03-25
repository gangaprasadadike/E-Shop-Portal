# E-Shop-Portal

Welcome to the E-Shop Portal, a full-stack e-commerce application featuring a Spring Boot backend and a React frontend.

## 1. Project Overview

This repository consists of two main components:
- **Backend (`ecommerce`)**: A Spring Boot application providing REST APIs for product management, user authentication, and authorization.
- **Frontend (`ecommersFrontEndApp`)**: A React application built with Vite, offering a premium user interface for customers and administrators.

### Core Features
- **Role-Based Access Control (RBAC)**: ADMIN and USER roles.
- **Secure Authentication**: JWT-based local login and OAuth2 (SSO) support.
- **Product Management**: See the products.
- **Responsive UI**: Modern design with React 19.

---

## 2. Setup Steps

### Backend (`ecommerce`)
1.  **Prerequisites**: Java 17, Maven, Database (MySQL/PostgreSQL).
2.  **Run**:
    ```bash
    cd ecommerce
    mvn clean install
    mvn spring-boot:run
    ```

### Frontend (`ecommersFrontEndApp`)
1.  **Prerequisites**: Node.js.
2.  **Install & Run**:
    ```bash
    cd ecommersFrontEndApp
    npm install
    npm run dev
    ```
    Access at `http://localhost:5173`.

---

## 3. API Details

| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| Auth | `/auth/register` | POST | Register user |
| Auth | `/auth/login` | POST | Login for JWT |
| Products | `/products` | GET | List products |
| Products | `/products` | POST | Add product (Admin) |

---

## 4. SSO Configuration

The application uses **OAuth2** for social login.
- **Backend**: Configured in `SecurityConfig.java` with a custom `OAuth2SuccessHandler`.
- **Frontend**: Handles redirection at `/oauth2-redirect` to store the token.