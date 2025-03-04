import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import Image1 from '../assest/slidebarIMG/SlideBar1.png'
import Image2 from '../assest/slidebarIMG/SlideBar2.png'
import Image3 from '../assest/slidebarIMG/SlideBar3.png'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})

export const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 20% off New User",
    description:
      "Enjoy up to 20% off on delicious ice creams, exclusively for new users! Indulge in your favorite flavors at a sweet discount. Hurry, grab your treat before the offer melts away!.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off New User",
    description:
      "Get up to 30% off on refreshing soft drinks for new users! Grab your favorite flavors at a discounted price—shop now!.",
  },
  {
    id: 3,
    img: Image3,
    title: "Upto 10% off New User",
    description:
      "Get up to 20% off on fresh and nutritious milk, exclusively for new users! Enjoy the best quality at a discounted price. Shop now and start your day with goodness!",
  },
];

export const getStarRating = (rating) => {
  const fullStar = '⭐'; // Filled star character
  const starCount = 5;  // Total number of stars

  // Return a string with only the filled stars based on the rating
  return Array.from({ length: Math.min(rating, starCount) }).fill(fullStar).join('');
};

export const NavbarMenu = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '/about' },
  { id: 3, title: 'Contact', link: '/contact' },
];

export const FooterData = [
  { id: 1, title: 'FAQs', link: '/' },
  { id: 2, title: 'Privacy Policy ', link: '/' },
  { id: 3, title: 'Shipping Policy', link: '/' },
  { id: 4, title: 'Refund', link: '/' },
  { id: 5, title: 'Terms & Conditions', link: '/' },
];

export const componentOptions = {
  0: [
    { name: 'Intel i5', price: 20000 },
    { name: 'AMD Ryzen 5', price: 22000 },
    { name: 'Intel i7', price: 35000 },
    { name: 'AMD Ryzen 7', price: 38000 },
    { name: 'Intel i9', price: 50000 },
    { name: 'AMD Ryzen 9', price: 55000 },
    { name: 'Intel Core i3', price: 15000 }, // Added Intel Core i3
    { name: 'AMD Ryzen 3', price: 17000 }, // Added AMD Ryzen 3
  ],
  1: [
    { name: 'Asus', price: 15000 },
    { name: 'MSI', price: 18000 },
    { name: 'Gigabyte', price: 16000 },
    { name: 'ASRock', price: 14000 },
    { name: 'EVGA', price: 17000 },
    { name: 'ZOTAC', price: 16000 },
    { name: 'Biostar', price: 13000 }, // Added Biostar
  ],
  2: [
    { name: 'Corsair 16GB', price: 8000 },
    { name: 'G.Skill 16GB', price: 9000 },
    { name: 'Kingston 16GB', price: 8500 },
    { name: 'Crucial 16GB', price: 8700 },
    { name: 'HyperX Fury 16GB', price: 9500 },
    { name: 'Patriot Viper 16GB', price: 9200 },
    { name: 'TeamGroup 16GB', price: 8800 }, // Added TeamGroup
  ],
  3: [
    { name: 'Corsair 650W', price: 6000 },
    { name: 'EVGA 750W', price: 9000 },
    { name: 'Thermaltake 600W', price: 5500 },
    { name: 'Cooler Master 750W', price: 9500 },
    { name: 'Seasonic 850W', price: 12000 },
    { name: 'Be Quiet! 600W', price: 7000 },
    { name: 'Super Flower 650W', price: 6500 }, // Added Super Flower
  ],
  4: [
    { name: 'Samsung 1TB SSD', price: 12000 },
    { name: 'WD 2TB HDD', price: 8000 },
    { name: 'Seagate 1TB HDD', price: 7500 },
    { name: 'Samsung 2TB SSD', price: 20000 },
    { name: 'Crucial 1TB SSD', price: 11000 },
    { name: 'WD 1TB SSD', price: 11500 },
    { name: 'Sabrent Rocket 1TB SSD', price: 13000 }, // Added Sabrent Rocket
  ],
  5: [
    { name: 'NZXT H510', price: 7000 },
    { name: 'Fractal Design Meshify', price: 9000 },
    { name: 'Cooler Master MasterBox', price: 8000 },
    { name: 'Thermaltake V200', price: 7500 },
    { name: 'Lian Li PC-O11', price: 12000 },
    { name: 'Phanteks Eclipse P400A', price: 8500 },
    { name: 'In Win 303', price: 9500 }, // Added In Win 303
  ],
  6: [
    { name: 'NVIDIA RTX 3060', price: 35000 },
    { name: 'AMD RX 6700 XT', price: 40000 },
    { name: 'NVIDIA RTX 3070', price: 55000 },
    { name: 'AMD RX 6800', price: 60000 },
    { name: 'NVIDIA RTX 3080', price: 80000 },
    { name: 'AMD RX 6900 XT', price: 90000 },
    { name: 'NVIDIA GTX 1660 Super', price: 25000 }, // Added NVIDIA GTX 1660 Super
    { name: 'AMD RX 6600 XT', price: 30000 }, // Added AMD RX 6600 XT
  ],
  7: [
    { name: 'Noctua NH-D15', price: 9000 },
    { name: 'Corsair H100i', price: 12000 },
    { name: 'Cooler Master Hyper 212', price: 4000 },
    { name: 'Be Quiet! Dark Rock 4', price: 10000 },
    { name: 'NZXT Kraken X63', price: 14000 },
    { name: 'Thermalright Assassin', price: 7500 },
    { name: 'Arctic Freezer 34 Esports Duo', price: 5000 }, // Added Arctic Freezer 34 Esports Duo
  ],
};
export const steps = [
  { title: 'Select Processor', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/processor-caticon.svg' },
  { title: 'Select Motherboard', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/motherboard-caticon.svg' },
  { title: 'Select RAM', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/ram-caticon.svg' },
  { title: 'Select Power Supply Unit', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/powersupply-caticon.svg' },
  { title: 'Select Storage', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/storage-caticon.svg' },
  { title: 'Select Cabinet', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/cabinets-caticon.svg' },
  { title: 'Select Graphics Card', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/graphiccard-caticon.svg' },
  { title: 'Select Cooler', icon: 'https://www.pcstudio.in/wp-content/uploads/2021/04/cooler-caticon.svg' },
];