// app/admin/dashboard/page.tsx
"use client";

import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";


export default  function AdminDashboard() {
      const { elementColor, theme } = useContext(ThemeContext);

  return (



    <form  className='m-5 w-full text-start  flex flex-col items-center justify-center  '>
            <h2 className='  text-5xl font-bold mb-4'>Add Event</h2>
            <div className='admin-login px-8 py-8 border rounded w-full max-w-4xl   text-start' 
            style={{backgroundColor: elementColor , color: theme === "light" ? "hsl(235, 19%, 35%)" : "white", borderColor: theme === "light" ? "hsl(233, 11%, 84%)" : "hsl(234deg 39% 85% / 33%)",
                }}
            >
                <div className='flex items-center gap-4 mb-8 text-gray-500 '>
                    <label htmlFor="doc-img">
<img src="/icons/upload_area.svg" className="w-16 cursor-pointer bg-gray-100 rounded-full" />
                    </label>
                    <input type='file' id='doc-img' hidden  />
                    <p>Upload Event <br /> Image </p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Event name</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Enter Event name"
                            />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Organizer Email </label>
                            <input
                                type='email'
                                className='border rounded px-3 py-2'
                                placeholder="Enter Organizer's email"
                               
                            />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Total Audience Limit</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Enter Audience Limit"
                               
                            />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Category</label>
                            <select
                                className='border rounded px-3 py-2'
                              
                            >
                                <option value="" disabled>Select category of the event</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Fees</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Enter Event fees"
                               
                            />
                        </div>
                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Event Type</label>
                            <select
                                className='border rounded px-3 py-2'
                              
                            >
                                <option value="" disabled>Select Event Type</option>
                                <option value=""> in person </option>
                                <option value="">online</option>
                                
                            </select>
                        </div>
                        

                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Event Date</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Time of the Event"
                               
                            />
                           
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Event location</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Address of the event /or online platfom if online "
                               
                            />
                           
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <label>Registration Deadline</label>
                            <input
                                type='text'
                                className='border rounded px-3 py-2'
                                placeholder="Enter Registration Deadline"
                             
                            />
                        </div>
                       
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-1 text-gray-600'>
                    <label className='mt-4 mb-2'>Event Description</label>
                    <textarea
                        placeholder="Write a brief description about your event"
                        className='w-full px-4 pt-2 border rounded'
                       
                    />
                </div>
                <button className=' bg-emerald-800 px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
            </div>
        </form>
  );
}




  
  
