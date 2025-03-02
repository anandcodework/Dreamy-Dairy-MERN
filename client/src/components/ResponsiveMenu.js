import React, { useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { NavbarMenu } from '../store/store';

const ResponsiveMenu = ({ open, setOpen }) => {
  const location = useLocation();
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = () => {
    setOpen(false); // Close the menu when a menu item is clicked
  };

  return (    
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div ref={menuRef} className='text-sm font-semibold uppercase bg-white/90 text-secondary py-5 m-6 mx-10 rounded-3xl'>
            <ul className='flex flex-col justify-center items-center gap-3'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    onClick={handleMenuItemClick} // Close menu on item click
                    className={`relative group uppercase no-underline tracking-wide inline-block py-3 px-5 transition-colors duration-300 ${location.pathname === item.link ? 'text-third bg-primary/50 shadow-lg rounded-md' : 'text-secondary'}`}
                  >
                    {item.title}
                    <span className="block absolute bottom-0 left-1/2 w-0 h-0.5 bg-third transition-all duration-200 ease-out group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
