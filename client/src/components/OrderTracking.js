import React, { useEffect, useState } from 'react';

const OrderTracking = ({ orderId }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8080/track-order/${orderId}`);
                const data = await response.json();
                
                if (data.success) {
                    setOrder(data.order);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;

    if (!order) return <div>No order found.</div>;

    return (
        <div>
            <h2>Order Tracking</h2>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Amount: {order.amount}</p>
            <p>Payment ID: {order.paymentId}</p>
        </div>
    );
};

export default OrderTracking;
