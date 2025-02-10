import { Avatar, Dropdown, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { FaArrowRightFromBracket, FaChevronDown, FaDownload, FaHeartPulse, FaLock } from 'react-icons/fa6'
import HeadUser from '../components/HeadUser'
import dayjs from 'dayjs'

const MainHeader = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('DD MMM, YYYY'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(dayjs().format('DD MMM, YYYY'));
    }, dayjs().endOf('day').diff(dayjs()) + 1000); // Set timeout to midnight

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [dayjs().startOf('day').toISOString()]);
  
  return (
    <Header className='bg-secondary text-white shadow-lg z-10'>
      <div className="flex justify-between items-center h-full">
        <h1 className='text-4xl font-bold'>Car Rental System</h1>
        <div className='flex items-center gap-2'>
          <span className="text-base font-semibold opacity-75">{currentDate}</span>
          <HeadUser />
        </div>
      </div>
    </Header>
  )
}

export default MainHeader