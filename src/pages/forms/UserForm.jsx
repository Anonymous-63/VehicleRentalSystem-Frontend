import { Form, Modal } from 'antd'
import React from 'react'
import FormHeader from '../../components/FormHeader';
import { InputField, PasswordField } from '../../components/FormFields';
import FormFooter from '../../components/FormFooter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addEntity } from '../../api/EntityOperatioon';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { useDispatch } from 'react-redux';
import { setFormStatus } from '../../store/features/formStatusSlice';

const UserForm = (props) => {
    const dispatch = useDispatch();
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
                            <InputField label={"Name"} name="name" required showCount errors={props.errors} />
                            <InputField label={"Email"} name="email" required showCount errors={props.errors} />
                            <InputField label={"Mobile No"} name="mobileNo" required showCount errors={props.errors} />
                            <PasswordField label={"Password"} name="password" required showCount errors={props.errors} />
                        </Form>
                    </Modal>
                )
            }
        </Formik >
    )
}

const initialValues = {
    name: "",
    email: "",
    mobileNo: "",
    Password: ""
}
const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3, ({ min }) => `At least ${min} characters required.`)
        .max(20, ({ max }) => `Maximum ${max} characters allowed.`)
        .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed.")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobileNo: Yup
        .string()
        .matches(/^[5-9]\d{9}$/, "Invalid mobile number")
        .required("Required"),
    password: Yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .max(20, ({ max }) => `Password must be no longer than ${max} characters`)
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        .required('Required'),
})


export default UserForm