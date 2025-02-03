import React, { useEffect } from 'react'
import FormHeader from '../../components/FormHeader';
import { Button, Form, Modal } from 'antd';

const VehicleForm = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = props;
    const { fieldValue } = props;

    useEffect(() => {
        form.setFieldsValue(fieldValue);
    }, [fieldValue, form]);
    return (
        <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={null}>
            <FormHeader title={"Add Vehicle"} closeModal={closeModal} />
            <div className='py-5'>
            
            </div>
        </Modal>
    )
}

export default VehicleForm