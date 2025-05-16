import React from 'react';
import { getUserFromSession } from '../../../lib/auth';
import { getUserEvents } from '../../../backend/controllers/userControllers';
import Events from './Events';

const page = async () => {
    const user = await getUserFromSession();
    const userId = user?.userId ? parseInt(user.userId.toString(), 10) : NaN;
    
    const usersevents=await getUserEvents(userId);
    console.log(usersevents)
  return (
    <Events usersevents={usersevents}/>
  );
}

export default page;
