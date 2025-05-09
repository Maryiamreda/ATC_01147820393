"use client";

import React, { useActionState } from 'react';
import { createAccount } from './action';
import { useFormStatus } from 'react-dom';

const CreateAccountForm = () => {
  const [state, createAccountAction] = useActionState(createAccount, undefined);
  
  return (
    <form action={createAccountAction} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">Username</label>
        <input 
          id="username" 
          name="username" 
          placeholder="Username" 
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      {state?.errors?.username && (
        <p className="text-red-500">{state.errors.username}</p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input 
          id="email" 
          name="email" 
          placeholder="Email" 
          className="rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

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
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

       
      <SubmitButton />
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending} 
      type='submit' 
      className=''
    >
      {pending ? 'Creating Account...' : 'Create Account'}
    </button>
  );
}

export default CreateAccountForm;