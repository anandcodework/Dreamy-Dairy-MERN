import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
          ...prev,
          [name]: value
      }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
          ...prev,
          profilePic: imagePic
        }));
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.password === data.confirmPassword) {
          try {
              const response = await fetch(SummaryApi.signUP.url, {
                  method: SummaryApi.signUP.method,
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
              });

              const dataApi = await response.json();
              if (dataApi.success) {
                  toast.success(dataApi.message);
                  navigate("/login");
              } else {
                  toast.error(dataApi.message);
              }
          } catch (error) {
              toast.error("Something went wrong. Please try again.");
          }
      } else {
          toast.error("Please check password and confirm password");
      }
  };

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <img src={data.profilePic || loginIcons} alt='Profile Preview' className='object-cover w-full h-full' />
                </div>

                <input type="file" accept="image/*" onChange={handleUploadPic} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center block mx-auto">Upload Photo</label>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name:</label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='text' 
                                placeholder='Enter your name' 
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email:</label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='email' 
                                placeholder='Enter email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label>Password:</label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder='Enter password'
                                value={data.password}
                                name='password' 
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password:</label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder='Confirm password'
                                value={data.confirmPassword}
                                name='confirmPassword' 
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                            </div>
                        </div>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>

                <p className='my-5'>Already have an account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  );
};

export default SignUp;
