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

const PaymentForm = (props) => {
    const dispatch = useDispatch();
    const { addEntity } = useEntityOperation();
    const { isModalOpen, closeModal, formValues } = props;

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/brand", values).then(result => {
            if (result.status) {
                successNotif(result.message);
                setSubmitting(false);
                closeModal();
            } else {
                errorNotif(result.message);
            }
        }).catch(error => {
            errorNotif(error.message);
        }).finally(() => {
            dispatch(setFormStatus());
        })
    }

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
                        <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={<FormFooter handleReset={() => resetForm(props)} />}
                            afterOpenChange={open => {
                                if (open && formValues) {
                                    props.setValues(formValues)
                                } else {
                                    resetForm(props);
                                }
                            }}
                        >
                            <FormHeader title="Payment" closeModal={closeModal} />
                            <Form layout='vertical' autoComplete='off' className='pt-3' >
                                <InputField label={"Credit/Debit Card"} name="cardNumber" maxLength={16} errors={props.errors} />
                                <DateField label={"Expiry Date"} name="expiryDate" picker={"month"} format={"MM-YY"} errors={props.errors} />
                                <InputField label={"CVV"} name="cvv" maxLength={3} errors={props.errors} />
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