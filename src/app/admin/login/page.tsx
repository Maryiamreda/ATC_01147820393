import React from 'react';

const AdminLogin = () => {
  return (
    <form  className="min-h-[80vh] flex items-center ">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl m-auto font-bold'><span className='text-emerald-800'>Admin </span>Login</p>
                <div className="w-full">
                    <p className="text-start">Email</p>
                    <input type='email' required className="mt-1 border border-[#DADADA]  w-full rounded p-2"   />
                </div>
                <div className="w-full">
                    <p className="text-start">Password</p>
                    <input type='password' required className="mt-1 border  border-[#DADADA]   w-full rounded p-2"  />
                </div>
                <button className="bg-emerald-800 text-white w-full py-2 my-2 rounded-md text-base">Login</button>


            </div>

        </form>
  );
}

export default AdminLogin;
