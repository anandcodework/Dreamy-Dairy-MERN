const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const Message = require('./models/messageModels');
const Razorpay = require('razorpay');
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const Order = require('./models/orderModel');
const bodyParser = require('body-parser');


const app = express();

// Ensure invoices directory exists
const invoicesDir = path.join(__dirname, 'invoices');
if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
}

// // CORS Configuration
// CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));




app.use(express.json());
app.use(cookieParser());
app.use("/api", router);



// Contact message endpoint
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving message to database.' });
    }
});

// Payment Gateway
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Razorpay payment order route
app.post('/create-order', async (req, res) => {
    const { amount, productId, userId } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        const newOrder = new Order({
            userId,
            productId,
            amount,
            status: 'Processing',
            paymentId: order.id,
        });
        await newOrder.save();

        // Generate PDF Invoice
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        page.drawText('Invoice', { x: 20, y: 360, size: 25, color: rgb(0, 0, 0) });
        page.drawText(`Order ID: ${order.id}`, { x: 20, y: 330, size: 15 });
        page.drawText(`Amount: ${amount}`, { x: 20, y: 310, size: 15 });
        page.drawText('Thank you for your purchase!', { x: 20, y: 290, size: 12 });

        const pdfBytes = await pdfDoc.save();
        const filePath = path.join(invoicesDir, `invoice_${order.id}.pdf`);

        // Save PDF to server
        fs.writeFileSync(filePath, pdfBytes);

        // Return order and invoice URL to client
        res.json({ success: true, order, invoiceUrl: `http://localhost:${process.env.PORT}/invoices/invoice_${order.id}.pdf` });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
});

// Serve Invoices as static files
app.use('/invoices', express.static(invoicesDir));

// Order Tracking Route
app.get('/track-order/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ paymentId: orderId });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error('Error retrieving order status:', error);
        res.status(500).json({ success: false, message: 'Error retrieving order status' });
    }
});

// Update product stock route
app.patch('/update-stock/:productId', async (req, res) => {
    const { quantity } = req.body;

    try {
        const product = await productModel.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        product.stock -= quantity; // Deduct stock
        await product.save();

        res.json({ success: true, message: 'Stock updated successfully' });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ success: false, message: 'Error updating stock' });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
