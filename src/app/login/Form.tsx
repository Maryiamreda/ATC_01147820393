"use client";

import React, { useActionState, useState } from 'react';
import { createAccount, login } from './action';
import { useFormStatus } from 'react-dom';

const CreateAccountForm = () => {
  const [userState, setUserState] = useState('Sign Up')
    const { pending } = useFormStatus();

  const actionFn = userState === 'Sign Up' ? createAccount : login;
  const [state, createAccountAction] = useActionState(actionFn, undefined);


  const toggleState = async () => {
        setUserState(userState === 'Sign Up' ? 'Log In' : 'Sign Up');

    };
// text-[#d4d4d4]

  return (
    <form action={createAccountAction} className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl
       text-sm shadow-lg">
     <p className="text-2xl font-semibold">{userState === 'Sign Up' ? "Craete Account" : "Login"}</p>
                <p>Please {userState === 'Sign Up' ? "Sign Up" : "Log in"} to book events</p>
         {userState=='Sign Up' && 
     <div  className="w-full">
                    <p className="text-start">Full Name</p>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
className="mt-1 border  w-full rounded p-2" 
    />
      </div>
     } 


      <div className="w-full">
                    <p className="text-start">Email</p>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
className="mt-1 border  w-full rounded p-2" 
        />
      </div>
     
      <div className="w-full">
        <p className="text-start">password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
className="mt-1 border  w-full rounded p-2" 
        />
      </div>
     
       
 <button 
      disabled={pending} 
      type='submit' 
className="bg-emerald-800 text-white w-full py-2 my-2 rounded-md text-base cursor-pointer  "    >
      {pending ? (userState === 'Sign Up' ? 'Creating Account...' : 'Logging In...') : (userState === 'Sign Up' ? 'Create Account' : 'Login')}
    </button>      
       {userState === 'Sign Up' ? <p >Already have an account? <span className="cursor-pointer  text-indigo-700 underline" onClick={toggleState} >Log In</span></p> :
                    <p>Don't have an account?<span className="cursor-pointer text-indigo-700 underline" onClick={toggleState} >Sign Up</span> </p>}

      </div>
    
    </form>
  );
}




export default CreateAccountForm;