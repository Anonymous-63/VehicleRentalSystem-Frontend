import { Button, Col, DatePicker, Descriptions, Divider, Layout, Row, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import PaymentForm from './forms/PaymentForm';
import dayjs from 'dayjs';

const CarDetailsPage = () => {
    const { state } = useLocation();
    const vehicle = state?.vehicle;
    const pickupCharge = 500;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [duration, setDuration] = useState(1);
    let selectedDates = [dayjs(), dayjs()];


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const disabledDate = (current) => current && current < dayjs().startOf('day');

    const onBookingDateChange = (dates) => {
        if (!dates?.[0] || !dates?.[1]) return;

        const diff = dayjs(dates[1]).diff(dayjs(dates[0]), "day") + 1;
        setDuration(diff);
    };

    const baseFare = (vehicle?.pricePerDay || 0) * duration;
    const totalPrice = baseFare + pickupCharge;

    const carInfo = [
        { label: "Brand", value: vehicle?.brand?.brand },
        { label: "Model", value: vehicle?.model?.model },
        { label: "Type", value: vehicle?.type?.type },
        { label: "Color", value: vehicle?.color },
        { label: "License Plate", value: vehicle?.licensePlate, span: 2 },
        { label: "Fuel Type", value: vehicle?.fuelType },
        { label: "Transmission", value: vehicle?.transmission },
        { label: "Manufacture Year", value: vehicle?.manufactureYear },
    ];

    return (
        <Layout className='h-full'>
            <Content className='h-full m-3 shadow-2xl rounded-2xl overflow-auto'>
                <Row className='h-full'>
                    {/* Car Image Section */}
                    <Col span={12} className='flex justify-center items-center bg-accent border border-black rounded-s-2xl'>
                        <img alt='vehicle' src={vehicle?.vehicleImg} className='w-full' />
                    </Col>

                    {/* Car Details Section */}
                    <Col span={12} className='p-3 border border-black bg-white rounded-r-2xl space-y-5'>

                        {/* Car Information */}
                        <Descriptions title="CAR INFO" size='small' column={3}>
                            {carInfo.map(({ label, value, span }) => (
                                <Descriptions.Item key={label} label={<span className='font-semibold text-black'>{label}</span>} span={span}>
                                    {value}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>

                        {/* Pricing & Booking Section */}
                        <div className='space-y-2'>
                            <div className="flex items-center space-x-2 text-3xl font-semibold">
                                <FaIndianRupeeSign />
                                <h1>{vehicle?.pricePerDay}</h1>
                                <span className="text-sm text-gray-500">per day</span>
                            </div>
                            <Tag color="green-inverse" className='font-bold text-base'>Free cancellation</Tag>

                            <Divider orientation='center' style={{ borderColor: '#000', fontWeight: 'bold' }}>BOOKING DATES</Divider>
                            <div className='p-4 bg-surface rounded-lg shadow-md'>
                                <DatePicker.RangePicker
                                    disabledDate={disabledDate}
                                    size='large'
                                    defaultValue={selectedDates}
                                    onCalendarChange={onBookingDateChange}
                                    className='w-full'
                                />
                            </div>

                            {/* Fare Details */}
                            <Divider orientation="center" style={{ borderColor: '#000', fontWeight: 'bold' }}>FARE DETAILS</Divider>
                            <div className='p-4 bg-surface rounded-lg shadow-md'>
                                <FareDetail label={`Base fare (${vehicle?.pricePerDay} x ${duration})`} amount={baseFare} />
                                <FareDetail label="Doorstep delivery & pickup" amount={pickupCharge} />
                                <FareDetail label="Insurance & GST" amount="Included" />
                            </div>

                            <Divider className='border-black' />
                            <FareDetail label="Total" amount={totalPrice} isTotal />

                            <Divider className='border-black' />
                        </div>

                        {/* Booking Button */}
                        <div className='flex justify-end'>
                            <Button type='primary' size='large' className='font-bold' onClick={() => setIsModalOpen(true)}>
                                Book Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Content>

            {/* Payment Modal */}
            <PaymentForm isModalOpen={isModalOpen} closeModal={closeModal} fareDetails={{ vehicleId: vehicle?.id, selectedDates, duration, price: totalPrice }} />
        </Layout>
    );
};

// Reusable Component for Fare Details
export const FareDetail = ({ label, amount, isTotal }) => (
    <Row gutter={[12, 12]} className={`py-1 `}>
        <Col span={12} className={`${isTotal ? "text-2xl font-medium" : "font-semibold text-gray-700"}`}>{label}</Col>
        <Col span={12} className={`flex items-center justify-end font-semibold ${isTotal ? "text-2xl font-medium" : "text-gray-700"}`}>
            {typeof amount === "number" ? <><FaIndianRupeeSign />&nbsp;{amount}</> : amount}
        </Col>
    </Row>
);

export default CarDetailsPage;
