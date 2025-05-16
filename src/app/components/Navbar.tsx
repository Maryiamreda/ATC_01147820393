"use client";
import React, { useActionState, useContext } from 'react';
import ROUTES from '../../../lib/routes';

import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeProvider';
import {logout} from '../user/login/action'
const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
     const themeContext = useContext(ThemeContext);
     
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  const { theme, toggleTheme } = themeContext;
  return (
<div className='flex items-center justify-between border-b p-4 border-b-gray-400'>
      
  <h1 className='w-36 hover:cursor-pointer'>EVENTIFY </h1>   
    <div>
            <ul className='hidden md:inline-flex gap-5 font-medium'>
                <Link href={ROUTES.HOME}>
                    <li className='py-1 text-sm '>HOME</li>
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
                <Link href={ROUTES.USER.BOOKINGS}>
                    <li className='py-1 text-sm'>MY BOOKINGS</li>
                    <hr className='bg-primary  border-none  outline-none h-0.5 m-auto w-3/5 hidden' />
                </Link>
                <Link href={ROUTES.ADMIN.LOGIN}  target="_blank" >
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
          <Link href="/user/login" className="bg-emerald-800 text-white  p-2 my-2 rounded-md hover:bg-emerald-700 ">
            Create account
          </Link>
        ) : (
          <form action={logout}>
            <button type="submit" className="bg-red-500 cursor-pointer  text-white  p-2 my-2 rounded-md hover:bg-red-400">
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
