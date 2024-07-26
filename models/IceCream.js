const prices = require('../config/prices.json');

class IceCream {
  constructor(baseFlavor, scoops = 1) {
    if (!prices.baseFlavors[baseFlavor]) {
      throw new Error(`Base flavor ${baseFlavor} not found`);
    }
    this.baseFlavor = baseFlavor;
    this.scoops = scoops;
    this.condiments = [];
    this.container = null;
    this.totalPrice = 0;
  }

  addCondiment(condimentName) {
    const condiment = prices.condiments[condimentName];
    if (typeof condiment === 'object' && condiment.price) {
      this.condiments.push(condiment);
    } else if (typeof condiment === 'number') {
      this.condiments.push({ price: condiment });
    }
  }

  setContainer(containerName) {
    const container = prices.containers[containerName];
    if (!container) {
      throw new Error(`Container ${containerName} not found`);
    }
    this.container = { price: container };
  }

  calculatePrice() {
    // Calculate the price based on base flavor and scoops
    this.totalPrice = this.scoops * prices.baseFlavors[this.baseFlavor];

    // Add the price of each condiment
    this.condiments.forEach(condiment => {
      this.totalPrice += condiment.price;
    });

    // Add the price of the container
    if (this.container) {
      this.totalPrice += this.container.price;
    }
  }
}

module.exports = IceCream;
