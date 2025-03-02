const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    amount: Number,
    currency: String,
    status: String,
    // Other fields you need
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
