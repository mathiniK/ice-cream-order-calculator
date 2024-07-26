class ContainerDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
  }

  setContainer(container) {
    this.iceCream.setContainer(container);
    this.iceCream.totalPrice += container.price;
  }
}

module.exports = ContainerDecorator;
