# Language Learning & Teacher Selection App

## About the Project

This project is a web-based educational platform designed to connect students with professional language teachers. The application provides an intuitive interface for browsing and selecting language teachers, managing user authentication (registration and login) and handling favorites.

## Core Technologies

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend as a Service:** Firebase (Authentication / Database)
- **Deployment & Tooling:** Git, GitHub, Vercel

## UI / UX Mockup & Design

The user interface is designed with a modern approach, focusing on comfort user experience:

- **Authentication Flow:** Secure login and registration modals with robust client-side form validation (email format checks, password length requirements, and required field indicators).
- **Dashboard & Teacher Catalog:** List layouts displaying teacher profiles, ratings, pricing, and specialties.
- **Favorites System:** Dedicated section for users to bookmark and manage their preferred teachers.

## Technical Requirements (Terms of Reference / ТЗ)

1. **User Authentication & Authorization:**
   - Secure registration and login functionality.
   - Comprehensive form validation (e.g., email format validation, password minimum 6 characters, mandatory name and email fields).
   - Informative error and success messaging (e.g., invalid credentials, existing email accounts, successful logins/registrations).

2. **Teacher Catalog:**
   - Dynamic loading of teacher profiles with error handling for network or server failures.
   - Pagination support to load and display teacher profiles in portions (e.g., Load More functionality)

3. **Favorites Management:**
   - Add or remove teachers from the user's favorites list.
   - Prompt unauthenticated users to log in when attempting to access or modify favorites.
