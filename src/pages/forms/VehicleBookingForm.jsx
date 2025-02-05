import { Form, Modal } from 'antd'
import React from 'react'
import FormHeader from '../../components/FormHeader';
import { DatetimeField, InputField, PasswordField } from '../../components/FormFields';
import FormFooter from '../../components/FormFooter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { useDispatch } from 'react-redux';
import { setFormStatus } from '../../store/features/formStatusSlice';
import { useEntityOperation } from '../../hooks/useEntityOperation';

const VehicleBookingForm = (props) => {
    const dispatch = useDispatch();
    const { addEntity, updateEntity } = useEntityOperation();
    const { isModalOpen, closeModal, formValues } = props;

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/user", values).then(result => {
            if (result.status) {
                closeModal();
                successNotif(result.message);
                setSubmitting(false);
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
                        <FormHeader title={formValues ? "Update User" : "Add User"} closeModal={closeModal} />
                        <Form layout='vertical' autoComplete='off' className='pt-3' >
                            <DatetimeField label={"Select Date"} name="bookingDates" errors={props.errors} />
                            <InputField label={"Name"} name="name" required showCount errors={props.errors} />
                            <InputField label={"Email"} name="email" required showCount errors={props.errors} />
                            <InputField label={"Mobile No"} name="mobileNo" required showCount errors={props.errors} />
                            <PasswordField label={"Password"} name="password" required showCount errors={props.errors} />
                        </Form>
                    </Modal>
                )
            }
        </Formik>
    )
}

const initialValues = {
    name: "",
    email: "",
    mobileNo: "",
    Password: ""
}
const validationSchema = Yup.object().shape({
})

export default VehicleBookingForm