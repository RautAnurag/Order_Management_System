# Order Management System

## Overview
The Order Management System (OMS) is a backend application designed to simulate order processing. The application allows users to place orders, calculate total revenue, and retrieve order summaries. The system also supports dynamic discount logic based on the order total and the number of items in the order.

## Features
- **Place an Order**: Users can place orders with details such as product name, quantity, and price per unit.
- **Order Summary**: Fetch order details by its unique ID.
- **Total Revenue**: Get the total revenue generated from all placed orders.

## Discount Logic
- If the total order amount exceeds **Rs 10,000**, a **10% discount** is applied.
- If the order includes **more than 5 items**, an additional **Rs 500** flat discount is applied.

## Setup and Usage


### Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/).
- **npm**: npm comes with Node.js. It is used to manage dependencies.


### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repository/order-management-system.git
   cd order-management-system

### How to Start Server CMD
    node server.js
