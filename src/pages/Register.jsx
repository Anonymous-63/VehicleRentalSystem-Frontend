import React from 'react'
import loginBg from "../assets/loginBg.jpg"
import { useNavigate } from 'react-router';
import { Content } from 'antd/es/layout/layout';
import { Button, Form, message } from 'antd';
import { register } from '../api/AccountOperation';
import { errorNotif, successNotif } from '../components/CustomNotification';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { InputField, PasswordField, TextAreaField } from '../components/FormFields';

const Register = () => {
    const navigate = useNavigate();

    const onSubmit = async (values, { setSubmitting }) => {
        register(values).then(result => {
            if (result.status) {
                successNotif(result.message);
                navigate("/login");
            } else {
                errorNotif(result.message);
            }
        }).catch(error => {
            errorNotif(error);
        }).finally(setSubmitting(false))
    }

    return (
        <Content className='relative bg-cover bg-center h-screen w-full' style={{ backgroundImage: `url(${loginBg})` }}>
            <div className='absolute bg-black h-full w-full bg-opacity-30'></div>
            <div className='h-full flex justify-center items-center'>
                <div className='h-auto w-3/12 min-w-80 bg-white opacity-95 flex justify-center items-center rounded-xl'>
                    <div className='flex flex-col flex-1 p-4 space-y-3 items-center justify-center'>
                        <span className='text-4xl font-bold font-sans'>SIGN UP</span>
                        <div className='w-full flex-col items-center'>
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (props) => (
                                        <Form layout='vertical'>
                                            <InputField name="name" label={"Name"} required showCount errors={props.errors} />
                                            <InputField name="email" label={"Email Id"} required showCount errors={props.errors} />
                                            <InputField name="mobileNo" label={"Mobile No"} required showCount errors={props.errors} />
                                            <PasswordField name="password" label={"Password"} required showCount errors={props.errors} />
                                            <Button type='primary' htmlType='submit' onClick={props.handleSubmit} className='w-full text-base font-bold'>SignUp</Button>
                                        </Form>
                                    )
                                }

                            </Formik>
                        </div>
                        <div className='flex justify-center'>
                            <span >Already have an account? <a onClick={() => navigate("/login")} className='text-blue-500 font-semibold cursor-pointer' >Sign In</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

const initialValues = {
    name: "",
    email: "",
    mobileNo: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(3, ({ min }) => `At least ${min} characters required.`)
        .max(20, ({ }) => `Maximum ${max} characters allowed.`)
        .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed.")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobileNo: Yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
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

export default Register