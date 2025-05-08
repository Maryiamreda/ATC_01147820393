"use client";

import React, { useActionState } from 'react';
import { login } from './action';
import { useFormStatus } from 'react-dom';

const Form = () => {
const [state, loginAction] = useActionState(login, undefined); //take a server action , gives you back the actual action property you can put on a form , state get updated while the action is running 
return (
<form action={loginAction}>


<div className="flex flex-col gap-2">
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}




<SubmitButton/>
</form>  );
}
const SubmitButton=()=>{
const{pending} =useFormStatus(); //access to a pending property
return(
    <button disabled={pending} type='submit' className='rounded-md bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-2 font-semibold text-black hover:opacity-50 disabled:from-grayscale-700 disabled:to-grayscale-700 disabled:text-white disabled:opacity-50'>
        Login
    </button>
)
}
export default Form;
