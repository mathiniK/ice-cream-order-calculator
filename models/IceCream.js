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
    this.additionalContainers = 0; 
    this.totalPrice = 0;
  }

  addCondiment(condiment) {
    this.condiments.push(condiment);
  }

  setContainer(containerName) {
    // Handle special case for iceCreamSandwichWafers
    if (containerName === 'iceCreamSandwichWafers') {
      this.container = { name: containerName, price: 0 };
      return; // No further processing needed for this container type
    }
  
    // For other container types, validate and set the container price
    const containerPrice = prices.containers[containerName];
    if (!containerPrice) {
      throw new Error(`Container ${containerName} not found`);
    }
  
    this.container = { name: containerName, price: containerPrice };
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
