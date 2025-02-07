import { Button, DatePicker, Divider, Form, Modal, Tag } from 'antd'
import React, { useState } from 'react'
import FormHeader from '../../components/FormHeader';
import { DatetimeRangeField, InputField, PasswordField } from '../../components/FormFields';
import FormFooter from '../../components/FormFooter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { useDispatch } from 'react-redux';
import { setFormStatus } from '../../store/features/formStatusSlice';
import { useEntityOperation } from '../../hooks/useEntityOperation';
import dayjs from 'dayjs';
import { FareDetail } from '../CarDetailsPage';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import PaymentForm from './PaymentForm';

const VehicleBookingForm = (props) => {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    let selectedDates = [dayjs(), dayjs()];
    const { isModalOpen, closeModal } = props;
    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        closeModal();
    };

    const vehicle = props?.vehicle;
    const pickupCharge = 500;

    const [duration, setDuration] = useState(1);
    const baseFare = (vehicle?.pricePerDay || 0) * duration;
    const totalPrice = baseFare + pickupCharge;

    const disabledDate = (current) => current && current < dayjs().startOf('day');

    const onBookingDateChange = (dates) => {
        if (!dates?.[0] || !dates?.[1]) return;

        const diff = dayjs(dates[1]).diff(dayjs(dates[0]), "day") + 1;
        setDuration(diff);
    };

    return (
        <>
            <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={[
                <Button key={"payment"} type='primary' onClick={() => setPaymentModalOpen(true)}>Make Payment</Button>
            ]}>
                <FormHeader title={"Vehicle Booking"} closeModal={closeModal} />
                <div className='space-y-2'>
                    <div className="flex items-center space-x-2 text-3xl font-semibold">
                        <FaIndianRupeeSign />
                        <h1>{vehicle?.pricePerDay}</h1>
                        <span className="text-sm text-gray-500">per day</span>
                    </div>
                    <Tag color="green-inverse" className='font-bold text-base'>Free cancellation</Tag>

                    <Divider style={{ borderColor: '#000' }} >BOOKING DATES</Divider>
                    <div className='p-4 bg-gray-200 rounded-lg shadow-md'>
                        <DatePicker.RangePicker
                            disabledDate={disabledDate}
                            size='large'
                            defaultValue={selectedDates}
                            onCalendarChange={onBookingDateChange}
                            className='w-full'
                        />
                    </div>

                    {/* Fare Details */}
                    <Divider orientation="center" style={{ borderColor: '#000' }}>FARE DETAILS</Divider>
                    <div className='p-4 bg-white'>
                        <FareDetail label={`Base fare (${vehicle?.pricePerDay} X ${duration})`} amount={baseFare} />
                        <FareDetail label="Doorstep delivery & pickup" amount={pickupCharge} />
                        <FareDetail label="Insurance & GST" amount="Included" />
                    </div>

                    <Divider className='border-black' />
                    <FareDetail label="Total" amount={totalPrice} isTotal />

                    <Divider className='border-black' />
                </div>
            </Modal>
            <PaymentForm isModalOpen={paymentModalOpen} closeModal={closePaymentModal} fareDetails={{ vehicleId: vehicle?.id, selectedDates, duration, price: totalPrice }} />
        </>
    )
}

export default VehicleBookingForm