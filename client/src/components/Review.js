import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getStarRating } from '../store/store';

// Sample initial ReviewData (replace with your actual data or fetch it from a source)
const initialReviewData = [
  {  
    id: 1,
    name: 'Anand',
    text: 'This is an amazing product! Highly recommend it. It really exceeded my expectations and delivered on all fronts.',
    img: '', // Empty image URL for testing
    rating: 5,
  },
  {
    id: 2,
    name: 'Abhishek',
    text: 'Good quality and excellent service. I am satisfied with the purchase and would buy again.',
    img: '', // Empty image URL for testing
    rating: 3,
  },
  // Add more reviews as needed
];

function Review() {
  const loadReviews = () => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialReviewData;
  };

  const [reviews, setReviews] = useState(loadReviews);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    img: '',
    rating: 5, // Default rating
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Ensure there are at least 4 reviews
  const displayReviews = reviews.length > 4 ? reviews.slice(0, 4) : reviews;

  const setting = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            img: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { ...formData, id: Date.now() };
    setReviews((prev) => [...prev, newReview]);
    setFormData({
      name: '',
      text: '',
      img: '',
      rating: 5,
    });
    setShowModal(false); // Hide the modal after submission
  };

  // Handle text truncation and read more functionality
  const MAX_TEXT_LENGTH = 100; // Adjust as needed
  const [expandedReview, setExpandedReview] = useState(null);

  const toggleReadMore = (id) => {
    setExpandedReview((prev) => (prev === id ? null : id));
  };

  const getDisplayText = (text, id) => {
    if (text.length <= MAX_TEXT_LENGTH) return text;
    if (expandedReview === id) return text;
    return `${text.substring(0, MAX_TEXT_LENGTH)}...`;
  };

  // Placeholder for image when there's no actual image
  const getPlaceholderImage = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full text-white text-2xl font-bold">
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="py-14 mb-10">
      <div className="p-20">
        {/* Header Section */}
        <div className="text-left mb-10 space-y-2 mr-auto">
          <h1 className="text-3xl font-semibold">How was your experience?</h1>
          <h1 className="text-3xl font-semibold">Give us a shout with a review and let us know!</h1>
        </div>

        {/* Add Review Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 btn-color"
          >
            Add Review
          </button>
        </div>

        {/* Testimonials Cards */}
        <div>
          <Slider {...setting}>
            {displayReviews.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-primary/70 h-80">
                  {/* Upper Section */}
                  <div className="flex justify-start items-center gap-5">
                    {data.img ? (
                      <img
                        src={data.img}
                        alt="Review"
                        className="rounded-full w-16 h-16"
                      />
                    ) : (
                      getPlaceholderImage(data.name)
                    )}
                    <div>
                      <p className="text-xl font-bold text-black/80">{data.name}</p>
                    </div>
                  </div>
                  {/* Bottom Section */}
                  <div className="py-6 space-y-4">
                    <p className="text-sm text-black font-semibold">
                      {getDisplayText(data.text, data.id)}
                      {data.text.length > MAX_TEXT_LENGTH && (
                        <button
                          onClick={() => toggleReadMore(data.id)}
                          className="text-fourth flex mt-5 mr-0 justify-end items-end"
                        >
                          {expandedReview === data.id ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </p>
                    <p className="text-white">{getStarRating(Number(data.rating))}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Review Form Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
              <button
                onClick={() => setShowModal(false)}
                className="absolute items-center top-4 right-4 py-1 px-3 btn-color"
              >
                &times;
              </button>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="text" className="block text-lg font-medium">Review</label>
                  <textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-lg font-medium">Rating (1-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    className="w-1/4 p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="img" className="block text-lg font-medium">Upload Image (Optional)</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 btn-color"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;
