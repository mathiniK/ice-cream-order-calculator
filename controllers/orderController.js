const orderService = require('../services/orderService');

exports.createOrder = (req, res) => {
  try {
    // Validate the request body format
    if (!req.body || typeof req.body !== 'object') {
      throw new Error('Invalid request format');
    }

    const { baseFlavor, scoops, condiments, container } = req.body;

    // Check for missing required fields
    if (!baseFlavor) {
      throw new Error('Base flavor is required');
    }
    if (!Number.isInteger(scoops) || scoops <= 0) {
      throw new Error('Scoops must be a positive integer');
    }
    if (!container) {
      throw new Error('Container type is required');
    }

    // Process the order
    const totalPrice = orderService.createOrder(req.body);

    // Return the calculated total price
    res.json({ totalPrice });

  } catch (error) {
    // Specific error handling
    let statusCode = 400; 
    let errorMessage = 'An error occurred';

    if (error.message.includes('Base flavor')) {
      errorMessage = 'Base flavor is required or invalid';
    } else if (error.message.includes('Scoops')) {
      errorMessage = 'Scoops value must be a positive integer';
    } else if (error.message.includes('Container')) {
      errorMessage = 'Container type is required or invalid';
    } else if (error.message.includes('Invalid request format')) {
      errorMessage = 'Invalid request format';
    }

    // Send the error response
    res.status(statusCode).json({ error: errorMessage });
  }
};
