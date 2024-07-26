const prices = require('../config/prices.json');
class CondimentsDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
  }

  addCondiment(condiment, quantity) {
    if (typeof condiment !== 'object' || !condiment.name) {
      throw new Error(`Invalid condiment format: ${condiment}`);
    }

    const condimentName = condiment.name;
    const condimentQuantity = quantity || condiment.quantity || 1;

    let priceInfo = prices.condiments[condimentName];

    if (!priceInfo) {
      // Check for dried fruits separately
      if (prices.condiments.driedFruit && prices.condiments.driedFruit[condimentName]) {
        priceInfo = prices.condiments.driedFruit[condimentName];
      } else {
        throw new Error(`Condiment ${condimentName} not found`);
      }
    }

    if (this.isCondimentAvailable(condimentName)) {
      let price = 0;

      if (typeof priceInfo === 'number') {
        // For condiments with fixed price (e.g., peanut butter, oreo crumbles)
        price = priceInfo * condimentQuantity;
      } else if (priceInfo.price) {
        // For condiments with fixed price (e.g., sprinkles, toasted marshmallow)
        price = priceInfo.price * condimentQuantity;
      } else if (typeof priceInfo === 'object') {
        // For dried fruits
        price = priceInfo.price * condimentQuantity;
      }

      this.iceCream.addCondiment({ name: condimentName, price, quantity: condimentQuantity });
    } else {
      throw new Error(`Condiment ${condimentName} not available for the selected base flavor`);
    }
  }

  isCondimentAvailable(condimentName) {
    const condiment = prices.condiments[condimentName];

    if (condiment && typeof condiment === 'object' && condiment.availableFor) {
      if (condiment.availableFor.includes(this.iceCream.baseFlavor)) {
        return true;
      }
    } else if (condiment && typeof condiment === 'number') {
      // For condiments with fixed price (e.g., peanut butter, oreo crumbles)
      return true;
    }

    // For dried fruits
    const driedFruits = prices.condiments.driedFruit;
    if (driedFruits && driedFruits[condimentName] && driedFruits.availableFor) {
      return driedFruits.availableFor.includes(this.iceCream.baseFlavor);
    }

    return false;
  }

}

module.exports = CondimentsDecorator;


