const OrderService = require('../services/orderService');

describe('OrderService', () => {
  it('should calculate the total price of the ice cream order correctly', () => {
    const orderDetails = {
      baseFlavor: 'nuttyFruit', // Use a flavor that supports driedApples
      scoops: 4,
      container: 'waffleBowl',
      condiments: [
        { name: 'peanutButter', quantity: 3 },
        { name: 'oreoCrumbles', quantity: 5 },
        { name: 'driedApples', quantity: 1 }
      ]
    };

    const expectedTotalPrice = 1175; // Update the expected price based on the new base flavor
    const totalPrice = OrderService.createOrder(orderDetails);
    expect(totalPrice).toBe(expectedTotalPrice);
  });

  it('should throw an error if a required order detail is missing', () => {
    const incompleteOrderDetails = {
      baseFlavor: 'nuttyFruit', 
      scoops: 4,
      condiments: [
        { name: 'peanutButter', quantity: 3 },
        { name: 'oreoCrumbles', quantity: 5 }
      ]
    };

    expect(() => {
      OrderService.createOrder(incompleteOrderDetails);
    }).toThrow('All required order details must be provided');
  });

  it('should throw an error if the scoops value is not a positive integer', () => {
    const invalidOrderDetails = {
      baseFlavor: 'nuttyFruit', 
      scoops: -1,
      container: 'waffleBowl',
      condiments: [
        { name: 'peanutButter', quantity: 3 },
        { name: 'oreoCrumbles', quantity: 5 },
        { name: 'driedApples', quantity: 1 }
      ]
    };

    expect(() => {
      OrderService.createOrder(invalidOrderDetails);
    }).toThrow('Scoops must be a positive integer');
  });
});
