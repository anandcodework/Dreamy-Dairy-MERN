import React, { useState } from 'react';

function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (response.ok) {
                setSuccess(true);
                setError('');
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to send message');
                setSuccess(false);
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError('Error sending message. Please try again later.');
            setSuccess(false);
        }
    };

    return (
        <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-black mb-12">Get In Touch with Dreamy Dairy Delights</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
                    <p className="text-lg text-gray-700 text-center leading-relaxed">
                        Have a craving or a question about our creamy, dreamy dairy delights? We’re here to help you savor every moment! Whether it’s custom dairy creations, fresh ice cream, or any other sweet treat, our experts are ready to make your day a little sweeter.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-black mb-6">Let’s Chat Over a Scoop!</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Sweet Dreamer"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Your Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="example@dairy.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Subject</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Dairy Delight Inquiry"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Your Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    rows="5"
                                    placeholder="Let’s chat about our delicious dairy products!"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300"
                            >
                                Send My Sweet Message
                            </button>
                            {success && <p className="text-green-500">Your message has been sent with love!</p>}
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-black mb-6">Our Creamy Contact Information</h2>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Dreamy Dairy Delights</span>
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Address:</span> Ramabai Colony, Ghatkopar East, Mumbai, MH - 400075, India
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Email:</span> <a href="mailto:am6429975@gmail.com" className="text-blue-500 hover:underline">am6429975@gmail.com</a>
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Phone:</span> +91 12345 67890
                        </p>
                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Website:</span> <a href="https://www.shop.in" className="text-blue-500 hover:underline">www.shop.in</a>
                        </p>
                        <div className="mt-8">
                            <iframe
                                className="w-full h-64 rounded-lg"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.754092058262!2d72.8862!3d19.1116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c64caaa!2sRamabai%20Colony!5e0!3m2!1sen!2sin!4v16181234567"
                                allowFullScreen=""
                                loading="lazy"
                                title="Shop Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
