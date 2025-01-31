import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router'

const MainContent = () => {
  return (
    <Content className='bg-accent'>
      <Outlet />
    </Content>
  )
}

export default MainContent