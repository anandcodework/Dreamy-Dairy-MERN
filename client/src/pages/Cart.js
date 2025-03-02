import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = Array(4).fill(null); // Loading skeleton placeholder

    // Fetch Cart Data
    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        const loadCartData = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        };
        loadCartData();
    }, []);

    // Handle Quantity Increment
    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, quantity: qty + 1 }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    // Handle Quantity Decrement
    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await fetch(SummaryApi.updateCartProduct.url, {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: id, quantity: qty - 1 }),
                });
                const responseData = await response.json();
                if (responseData.success) {
                    fetchData();
                }
            } catch (error) {
                console.error('Failed to update quantity:', error);
            }
        }
    };

    // Handle Cart Product Deletion
    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    // Calculate Total Quantity and Total Price
    const totalQty = data.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = data.reduce(
        (acc, product) => acc + product.quantity * product.productId.sellingPrice,
        0
    );

    // Handle Razorpay Payment
    const handlePayment = async () => {
        try {
            const paymentAmount = totalPrice;
            const response = await fetch('http://localhost:8080/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: paymentAmount }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                const { order } = responseData;
                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: 'INR',
                    name: 'Online Computer Shop',
                    description: 'Payment for products',
                    order_id: order.id,
                    handler: async (response) => {
                        toast('Payment successful!');
    
                        // Update stock for each product after payment success
                        for (const product of data) {
                            const productId = product.productId._id;
                            const quantityToDeduct = product.quantity;
    
                            await fetch(`http://localhost:8080/update-stock/${productId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ quantity: quantityToDeduct }),
                            });
                        }
    
                        // Optionally clear the cart or navigate to order summary
                    },
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                    },
                    theme: {
                        color: '#F37254',
                    },
                };
    
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast('Payment failed. Please try again.');
        }
    };
    
    return (
        <div className='container mx-auto'>
            {/* Cart Products */}
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading
                        ? loadingCart.map((_, index) => (
                              <div
                                  key={`loading-${index}`}
                                  className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'
                              />
                          ))
                        : data.map((product) => (
                              <div
                                  key={product._id}
                                  className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'
                              >
                                  <div className='w-32 h-32 bg-slate-200'>
                                      <img
                                          src={product.productId.productImage[0]}
                                          className='w-full h-full object-scale-down mix-blend-multiply'
                                          alt={product.productId.productName}
                                      />
                                  </div>
                                  <div className='px-4 py-2 relative'>
                                      <MdDelete
                                          className='absolute right-1 text-black rounded-full p-2 hover:bg-red-600 hover:text-black cursor-pointer'
                                          onClick={() => deleteCartProduct(product._id)}
                                      />
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                          {product.productId.productName}
                                      </h2>
                                      <p className='capitalize text-slate-500'>
                                          {product.productId.category}
                                      </p>
                                      <div className='flex items-center justify-between'>
                                          <p className='text-red-600 font-medium text-lg'>
                                              {displayINRCurrency(product.productId.sellingPrice)}
                                          </p>
                                          <p className='text-slate-600 font-semibold text-lg'>
                                              {displayINRCurrency(
                                                  product.productId.sellingPrice * product.quantity
                                              )}
                                          </p>
                                      </div>
                                      <div className='flex items-center gap-3 mt-1'>
                                          <button
                                              className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                              onClick={() => decreaseQty(product._id, product.quantity)}
                                          >
                                              -
                                          </button>
                                          <span>{product.quantity}</span>
                                          <button
                                              className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                              onClick={() => increaseQty(product._id, product.quantity)}
                                          >
                                              +
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                {/* Summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button
                                className='bg-blue-600 p-2 text-white w-full mt-2'
                                onClick={handlePayment}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
