import React from 'react'
import { BsCart3 } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside id='sidebar' className={`flex sm:flex-col h-full place-content-around sm:place-content-between px-5 sm:px-1 py-6`}>
      <div className='upper-sidebar flex w-[66%] sm:w-full sm:flex-col sm:gap-2 *:bg-[#000000] *:dark:bg-[#e9e9e9] **:text-white **:dark:text-[#0B0B0B]'>
        <button className={`flex rounded-md bg-white text-start w-[50%] sm:w-full justify-center sm:justify-start items-center gap-4 text-black text-2xl sm:text-base py-2 px-3 sm:py-3 sm:px-4 ease-in-out duration-150 hover:bg-gray-800 dark:hover:bg-gray-100`}><BsCalendar3 /><h2 className='hidden sm:block'>Appointments</h2></button>
        <button className={`flex rounded-md bg-white text-start w-[50%] sm:w-full justify-center sm:justify-start items-center gap-4 text-black text-2xl sm:text-base py-2 px-3 sm:py-3 sm:px-4 ease-in-out duration-150 hover:bg-gray-800 dark:hover:bg-gray-100`}><BsCart3 /><h2 className='hidden sm:block'>Store</h2></button>
      </div>
      <div className='lower-sidebar w-[33%] sm:w-full *:bg-[#000000] *:dark:bg-[#e9e9e9]'>
          <button className={`flex rounded-md bg-white text-start w-full justify-center sm:justify-start items-center gap-4 text-red-300 dark:text-red-600 text-2xl sm:text-base py-2 px-3 sm:py-3 sm:px-4 ease-in-out duration-150 hover:bg-red-800 dark:hover:bg-red-200`}><RiLogoutBoxLine /><h2 className='hidden sm:block'>Log Out</h2></button>
      </div>
    </aside>
  )
}

export default Sidebar