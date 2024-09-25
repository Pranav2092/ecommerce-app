---

# E-Commerce App

## Overview

This e-commerce web application allows users to browse products, add items to their cart, and make purchases securely. The app includes a fully integrated payment system, user authentication, and various other features to ensure smooth and secure transactions.

### Technologies Used:
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateways**: Razorpay, Stripe
- **Security**: JWT (JSON Web Token), bcrypt
- **Other Libraries/Packages**:
  - Validator
  - Multer
  - Cloudinary (for image uploads)
  - React Router DOM (for routing)
  - React Toastify (for notifications)
  - Axios (for API requests)

### Features:
1. **User Authentication**:
   - Secure registration and login using JWT and bcrypt.
   - Passwords are hashed using bcrypt before being stored in the database.

2. **Product Management**:
   - Add, update, and delete products with images uploaded to Cloudinary.
   - Multer is used for handling file uploads.

3. **Shopping Cart**:
   - Users can browse products and add them to their cart.
   - The cart can be updated before proceeding to checkout.

4. **Payment Integration**:
   - Integrated with Razorpay and Stripe for secure payments.
   - Users can choose their preferred payment gateway during checkout.

5. **Order Management**:
   - Users can view their order history.
   - Admin users can manage orders (update status, track payments).

6. **Responsive Design**:
   - The app is mobile-friendly and adapts to different screen sizes.

7. **Notifications**:
   - React Toastify is used to display notifications for actions like adding items to the cart, successful payment, etc.

8. **Data Validation**:
   - Input data is validated using the Validator library to ensure proper formatting and security.

---

## Installation

### Prerequisites
Ensure that you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Pranav2092/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` by default.

---

## Usage

### API Endpoints
The following are the main API endpoints available in the application:

#### User Routes
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Log in with existing credentials.
- **GET** `/api/users/profile`: Get user profile details (requires authentication).

#### Product Routes
- **GET** `/api/products`: Fetch all products.
- **POST** `/api/products`: Add a new product (requires admin access).
- **PUT** `/api/products/:id`: Update a product (requires admin access).
- **DELETE** `/api/products/:id`: Delete a product (requires admin access).

#### Cart Routes
- **POST** `/api/cart`: Add items to the cart.
- **GET** `/api/cart`: Get items in the cart for the current user.

#### Order Routes
- **POST** `/api/orders`: Create a new order after payment.
- **GET** `/api/orders`: Get order history for the current user.

#### Payment Routes
- **POST** `/api/payment/razorpay`: Make a payment using Razorpay.
- **POST** `/api/payment/stripe`: Make a payment using Stripe.

---

## Frontend Structure
The frontend is built with **React**, and the main components are:

- **HomePage**: Displays all products.
- **ProductPage**: Shows detailed information for a specific product.
- **CartPage**: Manages the user’s cart.
- **CheckoutPage**: Handles the payment process.
- **Auth Pages**: For login and registration.
- **Admin Pages**: For managing products and orders (accessible to admin users).

### Key Libraries
- **React Router DOM**: Handles routing between different pages.
- **Axios**: Used for making HTTP requests to the backend.
- **React Toastify**: Used for displaying notifications.

---

## Deployment
This project has been deployed on vercel. It can be viewed from the following links:

  Frontend : https://ecommerce-app-frontend-4bwdo6n8o.vercel.app/
  
  Backend : https://ecommerce-app-backend-fotktr7cu.vercel.app/
  
  Admin Panel : https://ecommerce-app-admin-bmfgbjmn6-pranav-sharmas-projects-37b3b875.vercel.app/

---

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This documentation provides a comprehensive overview of your e-commerce project, installation instructions, API endpoints, and key features. Feel free to modify any sections as needed.
  
