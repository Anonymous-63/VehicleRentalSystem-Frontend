import { Button, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Content className='h-screen flex items-center justify-center bg-gray-500'>
            <Result status={404} title="404" subTitle="Sorry, the page you visited does not exist." extra={<Button type="primary" onClick={() => navigate("/login")}>Back Home</Button>} />
        </Content>
    )
}

export default PageNotFound