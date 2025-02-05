import { Button, Col, DatePicker, Descriptions, Divider, Form, Layout, Row, Tag } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import VehicleBookingForm from './forms/VehicleBookingForm'
import { DatetimeField } from '../components/FormFields'
import { FaIndianRupeeSign } from 'react-icons/fa6'

const CarDetailsPage = (props) => {
    const location = useLocation();
    const { vehicle } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const carInfo = [
        {
            label: <span className='font-semibold'>Brand</span>,
            children: vehicle?.brand?.brand
        },
        {
            label: <span className='font-semibold'>Model</span>,
            children: vehicle?.model?.model
        },
        {
            label: <span className='font-semibold'>Type</span>,
            children: vehicle?.type?.type
        },
        {
            label: <span className='font-semibold'>Color</span>,
            children: vehicle?.color
        },
        {
            label: <span className='font-semibold'>License Plate</span>,
            children: vehicle?.licensePlate,
            span: 2
        },
        {
            label: <span className='font-semibold'>Fuel Type</span>,
            children: vehicle?.fuelType
        },
        {
            label: <span className='font-semibold'>Transmission</span>,
            children: vehicle?.transmission
        },
        {
            label: <span className='font-semibold'>Manufacture Year</span>,
            children: vehicle?.manufactureYear
        }
    ]

    return (
        <Layout className='h-full'>
            <Content className='h-full m-3 shadow-2xl rounded-2xl overflow-auto'>
                <Row className='h-full'>
                    <Col span={12} className='flex justify-center items-center bg-accent border border-black rounded-s-2xl'>
                        <img alt='vehicle' src={vehicle?.vehicleImg} width={'100%'} />
                    </Col>
                    <Col span={12} className='p-3 border border-black bg-white rounded-r-2xl space-y-5'>
                        <Descriptions title="CAR INFO" bordered items={carInfo} size='small' />
                        <div className='space-y-2'>
                            <div className="flex items-center space-x-2 text-3xl font-semibold">
                                <FaIndianRupeeSign />
                                <h1>2000</h1>
                                <span className="text-sm text-gray-500">per day</span>
                            </div>
                            <Tag color="green" className='font-bold'>Free cancellation</Tag>
                            <Divider orientation='left' style={{ borderColor: '#000' }} >Booking Dates</Divider>
                            <div>
                                <Form layout='vertical'>
                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item label="From Date" name="fromDate">
                                                <DatePicker className='w-full' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="To Date" name="toDate">
                                                <DatePicker className='w-full' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <Divider orientation="left" style={{ borderColor: '#000' }} >Price Details</Divider>
                        </div>
                        <div className='flex justify-end'>
                            <Button color='primary' variant='solid' className='text-lg font-bold' onClick={() => setIsModalOpen(true)} >Book Now</Button>
                        </div>
                    </Col>
                </Row>
            </Content>
            <VehicleBookingForm isModalOpen={isModalOpen} closeModal={closeModal} />
        </Layout>
    )
}

export default CarDetailsPage