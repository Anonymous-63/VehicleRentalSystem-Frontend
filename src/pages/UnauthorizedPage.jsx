import { Button, Result } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router'

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <Content className='h-screen flex items-center justify-center bg-gray-500'>
      <Result status={403} title="403" subTitle="Sorry, you are not authorized to access this page." extra={<Button type="primary" onClick={() => navigate("/login")}>Back Home</Button>} />
    </Content>
  )
}

export default UnauthorizedPage