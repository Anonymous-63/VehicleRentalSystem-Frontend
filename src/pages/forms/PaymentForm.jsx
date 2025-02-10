import { Button, DatePicker, Form, Input, Modal, Select, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
import { useEntityOperation } from '../../hooks/useEntityOperation';
import { DateField, InputField } from '../../components/FormFields';
import FormFooter from '../../components/FormFooter';
import FormHeader from '../../components/FormHeader';
import { USER_PREFIX } from '../../utils/Constants';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { getDataFromLocalStorage } from '../../utils/storage';
import dayjs from 'dayjs';
import { setFormStatus } from '../../store/features/formStatusSlice';

const PaymentForm = (props) => {
    const dispatch = useDispatch();
    const { addEntity } = useEntityOperation();
    const { isModalOpen, closeModal, fareDetails } = props;
    const { vehicleId, selectedDates, duration, price } = fareDetails;

    const disabledDate = (current) => current && current < dayjs().startOf('day');

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const user = getDataFromLocalStorage(USER_PREFIX);
            if (!user) throw new Error("User details not found.");
            if (!vehicleId) throw new Error("Vehicle details not found.");

            const bookingData = {
                ...values,
                userId: user.id,
                vehicleId,
                fromDate: dayjs(selectedDates[0]).toISOString(),
                toDate: dayjs(selectedDates[1]).toISOString(),
                duration,
                price,
            };

            const bookingResult = await addEntity("/booking", bookingData);
            if (!bookingResult.status || !bookingResult.data) {
                errorNotif(bookingResult?.message || "Booking not complete. Try again.");
            }
            if (bookingResult.status) {
                successNotif(bookingResult.message)
            }

            const paymentData = {
                bookingId: bookingResult.data.bookingId,
                userId: bookingResult.data.user?.id,
                paymentAmount: bookingResult.data.price,
            };

            const paymentResult = await addEntity("/payment", paymentData);
            if (!paymentResult.status) throw new Error(paymentResult.message);

            if (paymentResult.status) {
                successNotif(paymentResult.message);
            }
            closeModal();
        } catch (error) {
            errorNotif(error.message);
        } finally {
            setSubmitting(false);
            dispatch(setFormStatus());
        }
    };

    const resetForm = (props) => {
        props.resetForm();
    }

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    (props) => (
                        <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={<FormFooter handleReset={() => resetForm(props)} />} >
                            <FormHeader title="Payment" closeModal={closeModal} />
                            <Form layout='vertical' autoComplete='off' className='pt-3' >
                                <InputField label={"Credit/Debit Card"} name="cardNumber" maxLength={16} showCount errors={props.errors} />
                                <DateField label={"Expiry Date"} name="expiryDate" picker={"month"} format={"MM-YY"} disabledDate={disabledDate} errors={props.errors} />
                                <InputField label={"CVV"} name="cvv" maxLength={3} showCount errors={props.errors} />
                            </Form>
                        </Modal>
                    )
                }
            </Formik >
        </>
    )
}

const initialValues = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
}

const validationSchema = Yup.object({
    cardNumber: Yup.string()
        .length(16, 'Card number must be 16 digits')
        .matches(/^[0-9]+$/, 'Card number must be numeric')
        .required('Required'),
    expiryDate: Yup.string()
        .required('Required'),
    cvv: Yup.string()
        .length(3, 'CVV must be 3 digits')
        .matches(/^[0-9]+$/, 'CVV must be numeric')
        .required('Required'),
});

export default PaymentForm