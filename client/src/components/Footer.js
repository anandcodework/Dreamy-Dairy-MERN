import React from 'react';
import { MdComputer } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { NavbarMenu, FooterData } from '../store/store'
import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci';

function Footer() {
  return (
    <div className="bg-gradient-to-t from-secondary to-secondary">
      <div>
        <div className="grid md:grid-cols-4 gap-8 px-5 py-10 border-t-2 border-gray-300/10 text-primary">
          {/* Brand info */}
          <div className="pb-8 space-y-4 text-black font-semibold ml-20">
            <div className="container text-2xl flex items-center gap-2 font-bold uppercase">
              <Link to="#" className="flex flex-row justify-center items-center gap-2">
                <MdComputer className="text-primary flex" />
                <p className="text-third">Shop</p>
              </Link>
            </div>
            {/* Social media links */}
            <div className="container text-white flex items-center justify-start gap-5 text-primary mt-10 md:mt-0">
              <Link className="bg-[#3b5998] rounded-full p-[3px] transition-transform transform hover:scale-110 hover:shadow-lg" to="https://www.facebook.com/profile.php?id=100034283391605&mibextid=ZbWKwL">
                <CiFacebook className="text-3xl" />
              </Link>
              <Link className="instagram rounded-md p-[1.5px] transition-transform transform hover:scale-110 hover:shadow-lg" to="https://www.instagram.com/_knox_75">
                <CiInstagram className="text-3xl" />
              </Link>
              <Link className="bg-[#FF0000] rounded-md px-[2px] transition-transform transform hover:scale-110 hover:shadow-lg" to="https://www.youtube.com/@knoxffoffical">
                <CiYoutube className="text-3xl my-[1.5px]" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:col-span-3">
            {/* Company Section */}
            <div>
              <h1 className="text-third text-2xl font-semibold mb-6">Company</h1>
              <ul className="list-none p-0 text-primary text-sm">
                {NavbarMenu.map((item) => (
                  <li key={item.id} className="relative p-1">
                    <Link
                      to={item.link}
                      className="relative group text-lg text-third no-underline tracking-wide inline-block py-2"
                    >
                      {item.title}
                      {/* Hover effect */}
                      <span className="block absolute bottom-0 left-1/2 w-0 h-0.5 bg-third transition-all duration-200 ease-out group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information Section */}
            <div>
              <h1 className="text-third text-2xl font-semibold mb-6">Information</h1>
              <ul className="list-none p-0 text-primary text-sm">
                {FooterData.map((item) => (
                  <li key={item.id} className="relative p-1">
                    <Link
                      to={item.link}
                      className="relative group text-lg text-third no-underline tracking-wide inline-block py-2"
                    >
                      {item.title}
                      {/* Hover effect */}
                      <span className="block absolute bottom-0 left-1/2 w-0 h-0.5 bg-third transition-all duration-200 ease-out group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Map */}
            <div className='mr-10'>
              <iframe
                title="JBR Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.754092058262!2d72.8862!3d19.1116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c64caaa!2sRamabai%20Colony!5e0!3m2!1sen!2sin!4v16181234567"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="border-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="flex flex-col md:flex-row items-center justify-center py-6 border-t-2 border-third/15">
          <span className="text-sm text-third font-semibold opacity-70 text-center md:text-left md:mr-4">
            © Copyright 2024 Knox
          </span>
          <img
            src="https://www.pcstudio.in/wp-content/uploads/2021/04/footer-icons-2.png"
            alt="Footer Icons"
            className="w-1/2 mt-4 md:mt-0 md:w-1/6"
          />
        </div>

      </div>
    </div>
  );
}

export default Footer;
