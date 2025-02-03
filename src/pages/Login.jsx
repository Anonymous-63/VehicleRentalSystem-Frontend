import { Content } from 'antd/es/layout/layout'
import React from 'react'
import loginBg from "../assets/loginBg.jpg"
import { InputField } from '../components/FormFields'
import { Button, Form } from 'antd'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addToken, addUser } from '../store/features/userSlice'
import { errorNotif } from '../components/CustomNotification'
import { JWT_TOKEN_PREFIX } from '../utils/Constants'
import { getDataFromLocalStorage } from '../utils/storage'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAccountOperation } from '../hooks/useAccountOperation'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, getWebOperator } = useAccountOperation();

  const onSubmit = async (values, { setSubmitting }) => {
    login(values).then(result => {
      if (result.status) {
        dispatch(addToken(result));
        let token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);
        if (token) {
          getWebOperator().then(result => {
            if (result.status) {
              dispatch(addUser(result.data))
              navigate("/user")
            }
          }).catch(error => {
            errorNotif(error.message)
          })
        }
      } else {
        errorNotif(error.message);
      }
    }).catch(error => {
      errorNotif(error.message);

    }).finally(setSubmitting(false));
  }

  return (
    <Content className='relative bg-cover bg-center h-screen w-full' style={{ backgroundImage: `url(${loginBg})` }}>
      <div className='absolute bg-black h-full w-full bg-opacity-30'></div>
      <div className='h-full flex justify-center items-center'>
        <div className='h-auto w-3/12 min-w-80 bg-white opacity-95 flex justify-center items-center rounded-xl'>
          <div className='flex flex-col flex-1 p-4 space-y-3 items-center justify-center'>
            <span className='text-4xl font-bold font-sans'>SIGN IN</span>
            <div className='w-full flex-col items-center'>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                {
                  (props) => (
                    <Form layout='vertical' className='flex-col items-center'>
                      <InputField label={"Email Id"} name="email" required showCount errors={props.errors} />
                      <InputField label={"Password"} name="password" required showCount errors={props.errors} />
                      <Button type='primary' htmlType='submit' onClick={props.handleSubmit} className='w-full text-base font-bold'>Login</Button>
                    </Form>
                  )
                }
              </Formik>
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

const initialValues = {
  email: "",
  password: ""
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`) // Minimum length
    .max(20, ({ max }) => `Password must be no longer than ${max} characters`) // Maximum length
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter') // Requires at least one letter
    .matches(/[0-9]/, 'Password must contain at least one number') // Requires at least one digit
    .matches(/[\W_]/, 'Password must contain at least one special character') // Requires at least one special character
    .required('Required'),
});

export default Login