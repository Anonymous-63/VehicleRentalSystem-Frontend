import React from 'react'
import loginBg from "../assets/loginBg.jpg"
import { useNavigate } from 'react-router';
import { Content } from 'antd/es/layout/layout';
import { Button, Form } from 'antd';
import { InputField, PasswordField } from '../components/FormFields';

const Register = () => {
    const navigate = useNavigate();
    return (
        <Content className='relative bg-cover bg-center h-screen w-full' style={{ backgroundImage: `url(${loginBg})` }}>
            <div className='absolute bg-black h-full w-full bg-opacity-30'></div>
            <div className='h-full flex justify-center items-center'>
                <div className='h-auto w-3/12 min-w-80 bg-white opacity-95 flex justify-center items-center rounded-xl'>
                    <div className='flex flex-col flex-1 p-4 space-y-3 items-center justify-center'>
                        <span className='text-4xl font-bold font-sans'>SIGN UP</span>
                        <div className='w-full flex-col items-center'>
                            <Form layout='vertical' className='flex-col items-center'>
                                <InputField label={"Username"} name={"name"} />
                                <PasswordField label={"Password"} name={"password"} />
                                <Button type='primary' className='w-full text-base font-bold'>Login</Button>
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

export default Register