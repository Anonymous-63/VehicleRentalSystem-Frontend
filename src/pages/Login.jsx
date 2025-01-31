import { Content } from 'antd/es/layout/layout'
import React from 'react'
import loginBg from "../assets/loginBg.jpg"
import { InputField, PasswordField } from '../components/FormFields'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router'
import { login } from '../api/AccountOperation'
import { useDispatch } from 'react-redux'
import { addToken } from '../features/userSlice'
import { errorNotif } from '../components/CustomNotification'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    login(values).then(result => {
      if (result.status) {
        dispatch(addToken(result));
        navigate("/home")
      } else {
        errorNotif(error.message);
      }
    }).catch(error => {
      console.error(error);

    })
    console.log("Data", values);
  }

  return (
    <Content className='relative bg-cover bg-center h-screen w-full' style={{ backgroundImage: `url(${loginBg})` }}>
      <div className='absolute bg-black h-full w-full bg-opacity-30'></div>
      <div className='h-full flex justify-center items-center'>
        <div className='h-auto w-3/12 min-w-80 bg-white opacity-95 flex justify-center items-center rounded-xl'>
          <div className='flex flex-col flex-1 p-4 space-y-3 items-center justify-center'>
            <span className='text-4xl font-bold font-sans'>SIGN IN</span>
            <div className='w-full flex-col items-center'>
              <Form layout='vertical' onFinish={onFinish} className='flex-col items-center'>
                <InputField label={"Email Id"} name={"email"} rules={[{ required: true, message: "Required" }, { type: 'email', message: "Enter valid email id" }]} />
                <PasswordField label={"Password"} name={"password"} rules={[{ required: true, message: "Required  " }]} />
                <Button type='primary' htmlType='submit' className='w-full text-base font-bold'>Login</Button>
              </Form>
            </div>
            <div className='flex justify-center'>
              <span >Don't have an account? <a onClick={() => navigate("/register")} className='text-blue-500 font-semibold cursor-pointer' >Sign Up</a></span>
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
}

export default Login