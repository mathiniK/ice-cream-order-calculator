class ContainerDecorator {
  constructor(iceCream) {
    this.iceCream = iceCream;
  }

  setContainer(containerType) {
    if (this.isValidContainer(containerType)) {
      this.iceCream.setContainer(containerType);
    } else {
      throw new Error(`Invalid container type or exceeds scoop limit for ${containerType}`);
    }
  }

  isValidContainer(containerType) {
    const { scoops } = this.iceCream;

    switch (containerType) {
      case 'waferCone':
      case 'waffleCone':
        // If more than one scoop, each scoop requires a separate container
        this.iceCream.additionalContainers = scoops - 1;
        return true;
      case 'waffleBowl':
        // Each waffle bowl can hold up to 3 scoops
        if (scoops > 3) {
          this.iceCream.additionalContainers = Math.ceil(scoops / 3) - 1;
        }
        return true;
      default:
        return true;
    }
  }
}

module.exports = ContainerDecorator;
