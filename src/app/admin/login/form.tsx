"use client";
import React, { useActionState } from 'react';
import { adminLogin } from './action';
import { useFormState, useFormStatus } from 'react-dom';
interface FormState {
  errors: {
    email?: string[];
    password?: string[];
  };
}
const initialState: FormState = {
  errors: {},
};
const Form = () => {
        const { pending } = useFormStatus();
    
  const [state, formAction] = useFormState(adminLogin, initialState);
    
  return (
    <form action={formAction}  className="min-h-[80vh] flex items-center ">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl m-auto font-bold'><span className='text-emerald-800'>Admin </span>Login</p>
                <div className="w-full">
                    <p className="text-start">Email</p>
                    <input  name="email"
            type='email'  required className="mt-1 border border-[#DADADA]  w-full rounded p-2"   />
                  {state.errors.email && (
            <div className="text-red-500 text-sm">{state.errors.email}</div>
          )}
                </div>
                <div className="w-full">
                    <p className="text-start">Password</p>
                    <input  name="password" type='password' required className="mt-1 border  border-[#DADADA]   w-full rounded p-2"  />
                     {state.errors.password && (
            <div className="text-red-500 text-sm">{state.errors.password}</div>
          )}
                </div>
                <button     
                      disabled={pending} 

                  type='submit' 
 className="bg-emerald-800 text-white w-full py-2 my-2 rounded-md text-base cursor-pointer">
          {pending ? "Logging in..." : "Login"}

 </button>


            </div>

        </form>
  );
}

export default Form;
