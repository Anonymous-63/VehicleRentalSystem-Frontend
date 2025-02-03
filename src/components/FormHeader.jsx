import { Button } from 'antd';
import React from 'react'
import { FaXmark } from 'react-icons/fa6';

const FormHeader = (props) => {
    const { title, closeModal } = props;
    return (
        <div className={`flex justify-between items-center bg-secondary text-white h-12 -mx-6 -mt-5 px-5 rounded-t-lg`}>
            <span className='text-2xl font-semibold'>{title}</span>
            <Button type="text"  size="large" onClick={closeModal}>
                <FaXmark className="text-2xl font-semibold text-white" />
            </Button>
        </div>
    )
}

export default FormHeader