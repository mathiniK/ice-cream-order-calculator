const IceCream = require('../models/IceCream');
const ScoopsDecorator = require('../decorators/ScoopsDecorator');
const CondimentsDecorator = require('../decorators/CondimentsDecorator');
const ContainerDecorator = require('../decorators/ContainerDecorator');

class OrderService {
  createOrder(orderDetails) {
    const { baseFlavor, scoops, condiments, container } = orderDetails;

    if (!baseFlavor || !scoops || !condiments || !container) {
      throw new Error('All order details must be provided');
    }

    const iceCream = new IceCream(baseFlavor, scoops);

    // Apply scoops decorator
    const scoopsDecorator = new ScoopsDecorator(iceCream);
    scoopsDecorator.addScoops(scoops);

    // Apply condiments decorator
    const condimentsDecorator = new CondimentsDecorator(iceCream);
    condiments.forEach(condiment => {
      condimentsDecorator.addCondiment(condiment);
    });

    // Apply container decorator
    const containerDecorator = new ContainerDecorator(iceCream);
    containerDecorator.setContainer(container);

    iceCream.calculatePrice();

    return iceCream.totalPrice;
  }
}

module.exports = new OrderService();
