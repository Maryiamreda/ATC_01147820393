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


  return (
    <form action={createAccountAction} className="space-y-4">
     {userState=='Sign Up' && 
     <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">Username</label>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
     } 


      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
     
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
     
       
 <button 
      disabled={pending} 
      type='submit' 
      className=''
    >
      {pending ? (userState === 'Sign Up' ? 'Creating Account...' : 'Logging In...') : (userState === 'Sign Up' ? 'Create Account' : 'Login')}
    </button>      
       {userState === 'Sign Up' ? <p >Already have an account? <span className="cursor-pointer  text-primary underline" onClick={toggleState} >Log In</span></p> :
                    <p>Don't have an account?<span className="cursor-pointer text-primary underline" onClick={toggleState} >Sign Up</span> </p>}

    </form>
  );
}




export default CreateAccountForm;