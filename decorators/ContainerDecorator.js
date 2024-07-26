class ContainerDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
    this.iceCream.additionalContainers = this.iceCream.additionalContainers || 0; // Initialize additionalContainers
  }

  setContainer(containerType) {
    if (this.isValidContainer(containerType)) {
      this.iceCream.setContainer(containerType);
    } else {
      console.error(`Invalid container type: ${containerType}`);
      throw new Error(`Container type is required or invalid: ${containerType}`);
    }
  }

  isValidContainer(containerType) {
    const { scoops } = this.iceCream;
    const validContainers = ['waferCone', 'waffleCone', 'waffleBowl', 'iceCreamSandwichWafers'];

    if (!validContainers.includes(containerType)) {
      return false;
    }

    switch (containerType) {
      case 'waferCone':
      case 'waffleCone':
        // If more than one scoop, each scoop requires a separate container
        this.iceCream.additionalContainers = Math.max(0, scoops - 1);
        return true;
      case 'waffleBowl':
        // Each waffle bowl can hold up to 3 scoops
        this.iceCream.additionalContainers = Math.ceil(scoops / 3) - 1;
        return true;
      case 'iceCreamSandwichWafers':
        return true;
      default:
        // Return false for invalid container types
        return false;
    }
  }
}

module.exports = ContainerDecorator;
