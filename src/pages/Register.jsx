import React from 'react'
import loginBg from "../assets/loginBg.jpg"
import { useNavigate } from 'react-router';
import { Content } from 'antd/es/layout/layout';
import { Button, Form, message } from 'antd';
import { InputField, PasswordField, TextAreaField } from '../components/FormFields';
import { register } from '../api/AccountOperation';
import { errorNotif, successNotif } from '../components/CustomNotification';

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        register(values).then(result => {
            if (result.status) {
                successNotif(result.message);
            }
        }).catch(error => {
            errorNotif(error);
        })
    }

    return (
        <Content className='relative bg-cover bg-center h-screen w-full' style={{ backgroundImage: `url(${loginBg})` }}>
            <div className='absolute bg-black h-full w-full bg-opacity-30'></div>
            <div className='h-full flex justify-center items-center'>
                <div className='h-auto w-3/12 min-w-80 bg-white opacity-95 flex justify-center items-center rounded-xl'>
                    <div className='flex flex-col flex-1 p-4 space-y-3 items-center justify-center'>
                        <span className='text-4xl font-bold font-sans'>SIGN UP</span>
                        <div className='w-full flex-col items-center'>
                            <Form layout='vertical' onFinish={onFinish} className='flex-col items-center'>
                                <InputField label={"Name"} name={"name"} rules={nameFieldRules} />
                                <InputField label={"Email Id"} name={"email"} rules={emailFieldRules} />
                                <TextAreaField label={"About"} name={"about"} rules={aboutFieldRules} />
                                <PasswordField label={"Password"} name={"password"} rules={passwordFieldRules} />
                                <Button type='primary' htmlType='submit' className='w-full text-base font-bold'>Login</Button>
                            </Form>
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

const nameFieldRules = [
    {
        required: true, message: "Required"
    },
    {
        min: 3, message: "Name must be at least 3 characters"
    },
    {
        max: 20, message: "Name cannot exceed 20 character"
    },
    {
        validator: (_, value) =>
            /^[a-zA-Z]+$/.test(value)
                ? Promise.resolve()
                : Promise.reject("Username can only contain letters"),
    }
]

const emailFieldRules = [
    {
        required: true, message: "Required"
    },
    {
        type: 'email', message: "Enter valid email id"
    }
]

const aboutFieldRules = [
    {
        max: 100, message: "About cannot exceed 100 character"
    }
]

const passwordFieldRules = [
    {
        required: true, message: "Required"
    },
    {
        max: 16, message: "Password cannot exceed 16 character"
    }
]

export default Register