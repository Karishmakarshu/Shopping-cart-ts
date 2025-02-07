# Shopping Cart Implementation (TypeScript)
# Overview
This project implements a simple shopping cart in TypeScript that:

Allows adding products with specified quantities.
Retrieves product prices from a local Price API.
Calculates the subtotal, tax (12.5%), and total.
Includes unit tests to verify functionality.

# Setup Instructions
1. Clone the Repository
# git clone <repository-url>
# cd <repository-folder>
2. Install Dependencies
# npm install
3. Start the Price API
Before running the shopping cart, start the Price API:

# npm run serve-products
The API runs at http://localhost:3001/
# Available products: cheerios, cornflakes, frosties, shreddies, weetabix
# Example API request:
GET http://localhost:3001/products/cornflakes
Response: { "name": "cornflakes", "price": 2.52 }
4. Run Tests
# To verify functionality, run the unit tests:

npm test
Usage
# The shopping cart exposes functions to:

Add products by name and quantity.
Calculate subtotal, tax, and total.
Retrieve the cart state.
# Example Input & Output
tsc
cart.addProduct("cornflakes", 1); // Adds 1 x cornflakes @ 2.52 each
cart.addProduct("cornflakes", 1); // Adds another 1 x cornflakes @ 2.52 each
cart.addProduct("weetabix", 1);   // Adds 1 x weetabix @ 9.98 each

console.log(cart.getCartState());
# Expected Output:

nginx
Cart contains:
- 2 x cornflakes
- 1 x weetabix

Subtotal: $15.02  
Tax (12.5%): $1.88  
Total: $16.90  
# Assumptions & Trade-offs
# The Price API is assumed to be always available and returns valid responses.
If a product does not exist in the API, an error is thrown.
The tax calculation is always applied at 12.5%.
Rounding is handled appropriately where necessary.
# The solution avoids unnecessary abstractions and follows a simple, clean design.
Testing the Solution
Run npm test to execute unit tests.
Manually verify using a simple script in TypeScript.



