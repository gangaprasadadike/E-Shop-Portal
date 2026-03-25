# Ecommerce Backend

This is the Spring Boot backend for the E-Shop Portal.

## 1. Project Overview
- **Framework**: Spring Boot 4.0.4
- **Language**: Java 17
- **Security**: JWT + OAuth2 (SSO)

## 2. Setup Steps
1.  Ensure a database (MySQL/PostgreSQL) is running.
2.  Build the project:
    ```bash
    mvn clean install
    ```
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```

## 3. API Details
- **Auth**: `/auth/login`, `/auth/register`
- **Products**: `/products` (CRUD)
- **Users**: `/users/**`

## 4. SSO Configuration
Uses `spring-boot-starter-security-oauth2-client`. Success handler redirects to the frontend with a JWT.
