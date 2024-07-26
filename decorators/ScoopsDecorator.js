class ScoopsDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
  }

  addScoops(numScoops) {
    this.iceCream.scoops = numScoops;
    this.iceCream.totalPrice += numScoops * this.iceCream.baseFlavorPrice;
  }
}

module.exports = ScoopsDecorator;
