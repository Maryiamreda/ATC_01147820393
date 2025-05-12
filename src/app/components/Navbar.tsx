"use client";
import React, { useActionState, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeProvider';
import {logout} from '../login/action'
const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
     const themeContext = useContext(ThemeContext);
     
  // Handle the case where ThemeContext is undefined
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;
  return (
<div className='flex items-center justify-between border-b p-4 border-b-gray-400'>
      
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
                <Link href="/admin/login"  target="_blank" >
                    <li className='py-1 text-sm'>ADMIN</li> 
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
            </ul>
        </div>
       

  <div className='flex justify-center items-center gap-4'>
      <div onClick={toggleTheme} className='cursor-pointer w-5 h-5 '>
          {theme == 'dark' ? (<img src='/icons/icon-sun.svg' />) : (<img src='/icons/icon-moon.svg' className='filter brightness-60' />)}

     </div>            
     <div className="cursor-pointer text-xs">
       {!isLoggedIn ? (
          <Link href="/login" className="bg-emerald-800 text-white  p-2 my-2 rounded-md">
            Create account
          </Link>
        ) : (
          <form action={logout}>
            <button type="submit" className="bg-red-500 cursor-pointer  text-white  p-2 my-2 rounded-md">
              Logout
            </button>
          </form>
        )}
   </div>    

    </div>

</div>
  );
}

export default Navbar;
