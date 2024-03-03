# Candle eCommerce Website and API

## Overview
This project is an eCommerce website that sells candles. It includes a Django backend for the API built with Django Rest Framework (DRF). The frontend utilizes HTML, CSS, and JavaScript to fetch data from the API and render it on the web pages. Authentication is implemented using JWT (JSON Web Tokens).

## Features
- View products
- Manage customers
- Place orders
- Update order status
- Access user information
- Mark orders as completed

## Installation
1. Download and install Python version 3.11 on your machine.
2. Navigate to the project directory.
3. Run the following command to install dependencies:
    ```
    pip install -r requirements.txt
    ```
4. Activate the virtual environment:
    ```
    pipenv shell
    ```
5. Start the Django server:
    ```
    python manage.py runserver
    ```

## Endpoints
- `/api/products/` (GET)
- `/api/products/1` (GET)
- `/api/customers/` (GET, POST - authentication required)
- `/api/customers/1/` (PATCH - authentication required)
- `/api/orders/` (GET, POST - authentication required)
- `/api/orders/1/` (DELETE - authentication required)
- `/api/info/` (GET, POST - authentication required)
- `/api/info/1` (GET, PATCH - authentication required)
- `/api/completed/` (GET, POST - authentication required)
- `/api/token/` (POST - to generate a token)
- `/auth/users/` (POST, GET - to create a new user)

## Authentication
JWT authentication is used in this project. To make an API call, include the following in the header:
- `'Authorization: Bearer (JWT)'`
- Set cookie: `jwtToken=(JWT);`

## Dependencies
- Django
- Django Rest Framework
- Djoser
- simpleJWT
- Python 3.11
