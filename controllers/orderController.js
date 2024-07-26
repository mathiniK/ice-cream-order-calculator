const orderService = require('../services/orderService');

exports.createOrder = (req, res) => {
  try {
    const totalPrice = orderService.createOrder(req.body);
    res.json({ totalPrice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
