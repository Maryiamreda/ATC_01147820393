"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeProvider';

const Navbar = () => {
     const themeContext = useContext(ThemeContext);
  // Handle the case where ThemeContext is undefined
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;
  return (
    <div className='flex items-center justify-between border-b pb-4 border-b-gray-400'>
      
<h1 className='w-36 hover:cursor-pointer'>EVENTIFY </h1>   
    <div>
            <ul className='hidden md:inline-flex gap-5 font-medium'>
                <Link href="/">
                    <li className='py-1 text-sm '>HOME</li>
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
                <Link href="/mybookings">
                    <li className='py-1 text-sm'>MY BOOKINGS</li>
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
                <Link href="/admin"  target="_blank" >
                    <li className='py-1 text-sm'>ADMIN</li> 
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
            </ul>
        </div>
        {/* {token != '' ? (
            <div className='flex items-center gap-2 cursor-pointer' onClick={toggleMenu}>
                <img src={ProfilePic} className='w-8 rounded-full ' />
                <img src={DropDownIcon} className='' />

                {selectedOption == true &&
                    <div
                        className='text-gray-600 text-base font-medium absolute top-0 right-0 pt-20 pr-[10%] '
                    >
                        <div className='min-w-48 rounded p-4 gap-4 bg-stone-50 flex flex-col items-start '>
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/my-appointments')} className='hover:text-black' >My Appointments</p>
                            <p onClick={logout} className='hover:text-black'>Logout</p>
                        </div>

                    </div>
                }
            </div>)
            : (<button onClick={() => navigate('/login')} className='bg-primary text-white  text-sm py-3 px-8 rounded-3xl'>Create account</button>)
        } */}

<div className='inline-flex gap-3'>
  <div onClick={toggleTheme} className='cursor-pointer w-5 h-5 flex justify-center items-center'>
          {theme == 'dark' ? (<img src='/icons/icon-sun.svg' />) : (<img src='/icons/icon-moon.svg' />)}

        </div>             <Link href='login' className='bg-primary   text-sm py-3 px-8 rounded-3xl'>Create account</Link>

</div>

    </div>
  );
}

export default Navbar;
