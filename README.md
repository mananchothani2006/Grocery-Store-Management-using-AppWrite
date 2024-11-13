# Grocery Store Project

A simple and intuitive grocery store application built with React.js, utilizing Appwrite as the backend and database solution, React Router DOM for client-side routing, and Tailwind CSS for styling.

## Features

- **Browse Products**: View a list of grocery items with details.
- **Search & Filter**: Quickly find products through a search bar and filter options.
- **User Authentication**: Register, login, and manage user accounts using Appwrite's authentication.
- **Shopping Cart**: Add, remove, and view items in the shopping cart.
- **Checkout Process**: A streamlined process to review and place orders.
- **Order History**: View past purchases in the user dashboard.
- **Responsive Design**: Optimized for mobile and desktop using Tailwind CSS.

## Tech Stack

- **Frontend**: React.js
- **Backend & Database**: Appwrite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS

## Installation

### Prerequisites
- Node.js and npm installed
- Appwrite setup and configured

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/grocery-store.git
    cd grocery-store
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure Appwrite:
   - Set up a new project in Appwrite.
   - Create collections for **Products**, **Users**, and **Orders**.
   - Configure authentication and storage settings in Appwrite.
   - Update Appwrite endpoint and project ID in the `.env` file:
     ```plaintext
     REACT_APP_APPWRITE_ENDPOINT=<your_appwrite_endpoint>
     REACT_APP_APPWRITE_PROJECT_ID=<your_project_id>
     ```

4. Run the app:
    ```bash
    npm start
    ```

## Project Structure

```plaintext
.
├── public                  # Static files
├── src
│   ├── assets              # Images, icons, and other assets
│   ├── components          # Reusable components (Navbar, Footer, etc.)
│   ├── pages               # Page components (Home, Product, Cart, Checkout)
│   ├── services            # Appwrite API integration
│   ├── App.js              # Main app component with routing
│   └── index.js            # App entry point
├── .env                    # Environment variables
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
