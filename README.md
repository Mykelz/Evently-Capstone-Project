# Evently
Evently is a Node.js-based API for managing events, registrations, and reminders. This README provides an overview of the API endpoints, installation instructions, and usage examples.

## Table of Contents
- [Overview](#Overview)
- [Features](#Features)
- [Installation](#Installation)
- [Configuration](#Configuration)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [License](#Lincense)
# Overview
Evently is designed to help users create and manage events, send reminders, and handle user registrations. The API is RESTful and uses JSON for data interchange. It integrates with MongoDB as the database, with Mongoose as the ODM.

# Features
- Event Management: Create, update, and delete events.
- Event Ticket Management: Create and purchase event ticket.
- User Registration: Register users and manage their profiles.
- Event Reminders: Send reminders to registered users for upcoming events.
- Authentication: Secure endpoints using JWT-based authentication.

# Installation
To install and run evently locally, follow these steps.

1. Clone the repository.
   ```
   git clone https://github.com/yourusername/evently.git
   cd evently
   ```
2. Install dependencies:
    `npm install`
   
4. Set up the environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYSTACK_SECRET_KEY = 'your_paystack_secret_key'
   PAYSTACK_BASE_URL = 'your_paystack_url'
   GMAIL_ACCT = 'your_gmail_acct'
   APP_PASS = 'your_app_pass'
   ```
   
5. Run the application:
   `npm run dev`
   
    The server will start on http://localhost:5000.

# Configuration
Ensure you have the following environment variables configured:

   - PORT: The port number on which the server will run.
   - MONGO_URI: Your MongoDB connection string.
   - JWT_SECRET: The secret key for JWT token generation.

# Usage
### PostMan collection
You can find the Postman collection for Evently [Here](https://documenter.getpostman.com/view/21878719/2sA3s7kpUa). Import this collection into Postman to explore and test the API endpoints.

# Contributing
If you would like to contribute to Evently, please follow these steps:

   - Fork the repository.
   - Create a new branch for your feature or bugfix.
   - Make your changes and commit them.
   - Push your changes to your fork.
   - Create a pull request to the main repository.

---
This README provides a comprehensive overview of the Evently project and should be customized further as needed.
