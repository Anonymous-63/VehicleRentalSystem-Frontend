import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { FaPencil, FaPlus, FaTrash } from 'react-icons/fa6';

const PageHeader = (props) => {
  const { title, icon } = props;
  const { handleAdd, handleUpdate, handleDelete, handleRestore } = props;
  return (
    <Header className='bg-surface border-b border-black'>
      <div className='flex justify-between items-center h-full'>
        <span className="text-2xl font-bold flex items-center space-x-2">
          {icon}
          <span className="cursor-default">{title}</span>
        </span>
        <div className='flex gap-2'>
          <Button color='purple' variant='outlined' icon={<FaPlus />} onClick={handleAdd} className='text-base font-bold truncate'>
            Add
          </Button>
          <Button color='primary' variant='outlined' icon={<FaPencil />} onClick={handleUpdate} className='text-base font-bold truncate'>
            Update
          </Button>
          <Button color='danger' variant='outlined' icon={<FaTrash />} onClick={handleDelete} className='text-base font-bold truncate'>
            Delete
          </Button>
        </div>
      </div>
    </Header>
  )
}

export default PageHeader