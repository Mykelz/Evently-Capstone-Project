# Evently
Evently is a Node.js-based API for managing events, registrations, and reminders. This README provides an overview of the API endpoints, installation instructions, and usage examples.

## Table of Contents
- [Overview](#Overview)
- [Features](#Features)
- [Installation](#Installation)
- [Configuration](#Configuration)
- [Usage](#Usage)
- [API Endpoints](#APIendpoints)
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
3. Set up the environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYSTACK_SECRET_KEY = 'your_paystack_secret_key'
   PAYSTACK_BASE_URL = 'your_paystack_url'
   GMAIL_ACCT = 'your_gmail_acct'
   APP_PASS = 'your_app_pass'
   ```
4. Run the application:
   `npm run dev`
   
    The server will start on http://localhost:5000.
