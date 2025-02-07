import { Header } from 'antd/es/layout/layout'
import React from 'react'

const ReportHeader = (props) => {
    const { title, icon } = props;
    return (
        <Header className='bg-surface border-b border-black'>
            <div className='flex justify-between items-center h-full'>
                <span className="text-2xl font-bold flex items-center space-x-2">
                    {icon}
                    <span className="cursor-default">{title}</span>
                </span>
            </div>
        </Header>
    )
}

export default ReportHeader