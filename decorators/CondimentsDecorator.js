const prices = require('../config/prices.json');

class CondimentsDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
  }

  addCondiment(condimentName) {
    const condiment = prices.condiments[condimentName];

    if (!condiment) {
      throw new Error(`Condiment ${condimentName} not found`);
    }

    if (this.isCondimentAvailable(condiment, condimentName)) {
      this.iceCream.addCondiment(condimentName);
    } else {
      throw new Error(`Condiment ${condimentName} not available for the selected base flavor`);
    }
  }

  isCondimentAvailable(condiment, condimentName) {
    if (typeof condiment === 'object' && condiment.availableFor) {
      return condiment.availableFor.includes(this.iceCream.baseFlavor);
    } else if (condimentName in prices.condiments) {
      // For condiments like peanutButter, oreoCrumbles
      return true;
    } else if (condiment.driedApples || condiment.driedMango || condiment.driedApricot || condiment.driedBlueberry) {
      // For dried fruits, check their availability
      return condiment.availableFor.includes(this.iceCream.baseFlavor);
    }
    return false;
  }
}

module.exports = CondimentsDecorator;
