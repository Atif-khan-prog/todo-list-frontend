import React from 'react'
import { FaSearch } from "react-icons/fa";
import TodayTasks from './TodayTasks';

const SideBar = () => {
  return (
    <div className='min-h-96 p-3 rounded-2xl flex items-start w-3/9 bg-gray-100'>
      <div className='flex flex-col justify-between w-full h-full'>
        
        {/* Top Section */}
        <div>
          <h4 className='font-bold'>Menu</h4>
          <div className='flex items-center justify-between p-1 border border-gray-200 h-7 rounded bg-white w-full'>
            <input
              className='focus:text-gray-500 text-[12px] pl-2 w-3/4 focus:outline-none'
              type="Search"
              name="search"
              id="search"
              placeholder='Search'
            />
            <p className='cursor-pointer'>
              <FaSearch size={15} color='gray'/>
            </p>
          </div>

          {/* Tasks */}
          <div className='mt-3 text-gray-700'>
            <ul className='flex flex-col items-start'>
              <p className='text-[11px] font-bold'>Tasks</p>
              <div className='ml-1 w-full text-[12px]'>
                <li className=''>Upcoming</li>
                <li className='p-1 border-0 rounded bg-gray-200 cursor-pointer outline-none   mr-2'
               >Today</li>
                <li className='p-1'>Calendar</li>
              </div>
            </ul>
          </div>

          {/* Lists */}
          <div className='mt-3 text-gray-700'>
            <ul className='flex flex-col items-start'>
              <p className='text-[11px] font-bold'>Lists</p>
              <div className='ml-1 w-full text-[12px]'>
                <li className='border-0 rounded bg-gray-200 outline-none p-1 mr-2'>Personal</li>
                <li className='p-1'>Work</li>
                <li className='p-1'>List 1</li>
              </div>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='text-[12px] mt-3 text-gray-700'>
          <span className='block'>Settings</span>
          <span className='block'>Log Out</span>
        </div>

      </div>
    </div>
  )
}

export default SideBar
