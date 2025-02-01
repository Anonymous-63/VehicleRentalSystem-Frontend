import { Button, Form, Modal } from 'antd'
import React from 'react'
import FormHeader from '../../components/FormHeader';
import { InputField } from '../../components/FormFields';
import FormFooter from '../../components/FormFooter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Password from 'antd/es/input/Password';
import { addEntity } from '../../api/EntityOperatioon';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { successMessage } from '../../components/ApiMessage';
import { useDispatch } from 'react-redux';
import { setFormStatus } from '../../features/formStatus';

const UserForm = (props) => {
    const dispatch = useDispatch();
    const { isModalOpen, closeModal } = props;

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/user", values).then(result => {
            if (result.status) {
                successNotif(result.message);
                setSubmitting(false);
                closeModal();
                dispatch(setFormStatus());
            } else {
                errorNotif(result.message);
            }
        })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                (props) => (
                    <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={<FormFooter handleReset={() => resetForm(props)} />} >
                        <FormHeader title={"Add User"} closeModal={closeModal} />
                        <div className='py-5'>
                            <Form layout='vertical' autoComplete='off' >
                                <InputField label={"Name"} name="name" required showCount errors={props.errors} />
                                <InputField label={"Email"} name="email" required showCount errors={props.errors} />
                                <InputField label={"About"} name="about" showCount errors={props.errors} />
                                <InputField label={"Password"} name="password" required showCount errors={props.errors} />
                            </Form>
                        </div>
                    </Modal>
                )
            }
        </Formik >
    )
}

const initialValues = {
    name: "",
    email: "",
    about: "",
    Password: ""
}
const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, ({ min }) => `At least ${min} characters required.`).max(20, ({ }) => `Maximum ${max} characters allowed.`).required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`) // Minimum length
        .max(20, ({ max }) => `Password must be no longer than ${max} characters`) // Maximum length
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter') // Requires at least one letter
        .matches(/[0-9]/, 'Password must contain at least one number') // Requires at least one digit
        .matches(/[\W_]/, 'Password must contain at least one special character') // Requires at least one special character
        .required('Required'),
})


const submitForm = async (values, operation) => {
    addEntity("/user", values).then(result => {
        if (result.status) {

        }
    }).catch(error => {
        errorNotif(error);
    });
}


export default UserForm