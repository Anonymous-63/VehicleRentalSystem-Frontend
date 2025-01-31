import React, { useEffect } from 'react'
import FormHeader from '../../components/FormHeader';
import { Button, Form, Modal } from 'antd';
import { InputField, PasswordField, TextAreaField } from '../../components/FormFields';

const VehicleForm = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = props;
    const { onFinish, onFinishFailed } = props;
    const { fieldValue } = props;

    useEffect(() => {
        form.setFieldsValue(fieldValue);
    }, [fieldValue, form]);
    return (
        <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={null}>
            <FormHeader title={"Add Vehicle"} closeModal={closeModal} />
            <div className='py-5'>
                <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off' >
                    <InputField label={"Name"} name={"name"}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    />
                    <InputField label={"Email Id"} name={"email"} />
                    <TextAreaField label={"About"} name={"about"} />
                    {!fieldValue && <PasswordField label={"Password"} name={"password"} />}

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default VehicleForm