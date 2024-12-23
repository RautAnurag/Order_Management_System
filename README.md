# Order Management System

order Management System 
Objective :
Build a backend application that simulates an order Management System with dynamaic discount logic

Requirements: 
1. Core Functionality : 
Implement RESTful APIs for the following :

    Place an Order: Accept order details (product name, quantity, and price per unit).
    Each order should have a unique ID and timestamp.

    Get Order Summary: Retrieve details of an order by unique ID.
    
    Calculate Total Revenue: Return the total revenue generated from all placed orders.

2. Dynamic Logic:
    Apply a discount rule:

    If the total order amount (quantity*price) exceeds Rs 10,000, apply a 10% discount 
    
    If the order includes more than 5 times, apply an additional Rs 500 flat discount.

    Ensure the discount reflect in the stored order data and order summary API response.

3.  Additional Constraints:

    Use JavaScript along with express JavaScript

    use an in-memory database (eg and array) for storing order data

    Validate all inputs (eg no negative quantities or order)

    
