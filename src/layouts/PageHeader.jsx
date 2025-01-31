import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'

const PageHeader = (props) => {
  const { title, icon } = props;
  const { handleAdd, handleUpdate, handleDelete, handleRestore } = props;
  return (
    <Header className='bg-secondary'>
      <div className='flex justify-between items-center h-full'>
        <span className="text-2xl font-bold flex items-center space-x-2">
          {icon}
          <span className="cursor-default">{title}</span>
        </span>
        <div className='flex gap-2'>
          <Button onClick={handleAdd} className='bg-blue-500 text-white truncate shadow-md text-base'>
            Add
          </Button>
          <Button onClick={handleUpdate} className='bg-orange-500 text-white truncate shadow-md'>
            Update
          </Button>
          <Button onClick={handleDelete} className='bg-red-500 text-white truncate shadow-md'>
            Delete
          </Button>
        </div>
      </div>
    </Header>
  )
}

export default PageHeader