import { Badge, Button, Card, Descriptions } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

const CarCard = ({ vehicle }) => {
    const navigate = useNavigate();
    return (
        <Card
            cover={
                <img alt='coverImg' src={vehicle?.vehicleImg} className='h-48 object-cover w-full' />
            }
            actions={[
                <Button color='primary' variant='text' className='font-bold' onClick={() => navigate("/carDetails", { state: { vehicle } })} >Show Details</Button>,
                <Button color='danger' variant='text' className='font-bold'  >Book Now</Button>,
            ]}
            className='flex flex-col h-full'
        >
            <Meta title={
                <div className="flex items-center space-x-2 text-xl font-semibold">
                    <FaIndianRupeeSign/>
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
    )
}

export default CarCard