import { Badge, Button, Card, Descriptions } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useState } from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import VehicleBookingForm from '../pages/forms/VehicleBookingForm'

const CarCard = ({ vehicle }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card hoverable
                cover={
                    <img alt='coverImg' src={vehicle?.vehicleImg} className='h-48 object-cover w-full' />
                }
                actions={[
                    <Button color='primary' variant='text' onClick={() => navigate("/carDetails", { state: { vehicle } })} className='font-bold' >Show Details</Button>,
                    <Button color='danger' variant='text' onClick={() => setIsModalOpen(true)} className='font-bold'  >Book Now</Button>,
                ]}
                className='flex flex-col h-full'
            >
                <Meta title={
                    <div className="flex items-center space-x-2 text-xl font-semibold">
                        <FaIndianRupeeSign />
                        <h1>2000</h1>
                        <span className="text-sm text-gray-500">per day</span>
                    </div>
                }
                    description={
                        <Descriptions size='small' column={2}>
                            <Descriptions.Item label="Brand">{vehicle?.brand?.brand}</Descriptions.Item>
                            <Descriptions.Item label="Model">{vehicle?.model?.model}</Descriptions.Item>
                            <Descriptions.Item label="Type">{vehicle?.type?.type}</Descriptions.Item>
                            <Descriptions.Item label="License Plate">{vehicle?.licensePlate}</Descriptions.Item>
                        </Descriptions>
                    }
                />
            </Card>
            <VehicleBookingForm isModalOpen={isModalOpen} closeModal={closeModal} vehicle={vehicle} />
        </>
    )
}

export default CarCard