# Ice Cool Ice Cream Order Calculator
This application is built with Node.js and Express and uses the decorator pattern to manage and calculate the cost of customized ice cream orders.

# Overview
The Ice Cream Pricing System allows users to place orders for customized ice cream with various base flavors, scoops, condiments, and containers. The system calculates the total price based on the selected options and handles additional containers when needed.

The system uses the Decorator Pattern to manage ice cream customization. The decorator pattern is suitable for this application because it allows for adding new features without modifying existing codebase. Each decorator handles specific ice cream customization.

### Installing
1. Clone the repository:
   git clone https://github.com/mathiniK/ice-cream-order-calculator.git

2. Navigate to the project directory
   cd ice-cream-pricing-system

3. npm install

Start the server using "npm start"

The server will start on port '3000'. Send a POST request to '/api/order' with the JSON body:

e.g.
{
  "baseFlavor": "nuttyFruit",
  "scoops": 4,
  "container": "waffleBowl",
  "condiments": [
    { "name": "peanutButter", "quantity": 3 },
    { "name": "oreoCrumbles", "quantity": 5 },
    { "name": "driedApples", "quantity": 1 }
  ]
}
