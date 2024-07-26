const IceCream = require('../models/IceCream');
const ScoopsDecorator = require('../decorators/ScoopsDecorator');
const CondimentsDecorator = require('../decorators/CondimentsDecorator');
const ContainerDecorator = require('../decorators/ContainerDecorator');

class OrderService {
  createOrder(orderDetails) {
    const { baseFlavor, scoops, condiments = [], container } = orderDetails;

    if (!baseFlavor || !scoops || !container) {
      throw new Error('All required order details must be provided');
    }

    // Validate that scoops is a positive integer
    if (!Number.isInteger(scoops) || scoops <= 0) {
      throw new Error('Scoops must be a positive integer');
    }
    

    const iceCream = new IceCream(baseFlavor, scoops);

    // Apply scoops decorator
    const scoopsDecorator = new ScoopsDecorator(iceCream);
    scoopsDecorator.addScoops(scoops);

    // Apply condiments decorator only if condiments are provided
    if (condiments.length > 0) {
      const condimentsDecorator = new CondimentsDecorator(iceCream);
      condiments.forEach(condiment => {
        condimentsDecorator.addCondiment(condiment);
      });
    }

    // Apply container decorator
    const containerDecorator = new ContainerDecorator(iceCream);
    containerDecorator.setContainer(container);

    iceCream.calculatePrice();

    return iceCream.totalPrice;
  }
}

module.exports = new OrderService();
