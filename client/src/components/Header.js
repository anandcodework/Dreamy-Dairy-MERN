import React, { useContext, useState, useRef, useEffect } from 'react';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { MdMenu, MdComputer } from 'react-icons/md';
import ResponsiveMenu from './ResponsiveMenu';
import Logo from '../assest/Logo.jpg'

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || ""; // Get the first query
  const [search, setSearch] = useState(searchQuery);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuDisplay && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuDisplay]);

  const handleLogout = async () => {
    const response = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex items-center gap-4'>
          <div onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl text-primary" />
          </div>
          <ResponsiveMenu open={open} setOpen={setOpen} />
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <Link to="/" className="flex flex-row justify-center items-center gap-2">
            <img
                      src={Logo}
                      alt=""  
                      className="w-8 h-8 rounded-lg object-contain mx-auto"
                    />
              <p>Dreamy Dairy</p>
            </Link>
          </div>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='search product here...'
            className='w-full outline-none'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center' ref={menuRef}>
            {user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(false)}>
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart /></span>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}
          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
