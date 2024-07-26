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
    this.additionalContainers = 0; // To keep track of additional containers
    this.totalPrice = 0;
  }

  addCondiment(condiment) {
    this.condiments.push(condiment);
  }

  setContainer(containerName) {
    const container = prices.containers[containerName];
    if (!container) {
      throw new Error(`Container ${containerName} not found`);
    }
    this.container = { name: containerName, price: container };
  }

  calculatePrice() {
    // Calculate the price based on base flavor and scoops
    this.totalPrice = this.scoops * prices.baseFlavors[this.baseFlavor];

    // Add the price of each condiment
    this.condiments.forEach(condiment => {
      this.totalPrice += condiment.price;
    });

    // Add the price of the container and any additional containers
    if (this.container) {
      const containerPrice = prices.containers[this.container.name];
      this.totalPrice += containerPrice * (1 + this.additionalContainers);
    }
  }
}

module.exports = IceCream;
