import { Button, Form, Modal } from 'antd';
import React, { useEffect } from 'react'
import FormHeader from '../../components/FormHeader';

const VehicleTrimLevelForm = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, closeModal } = props;
    const { onFinish, onFinishFailed } = props;
    const { fieldValue } = props;

    useEffect(() => {
        form.setFieldsValue(fieldValue);
    }, [fieldValue, form]);
    return (
        <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={null}>
            <FormHeader title={"Add Trim Level"} closeModal={closeModal} />
            <div className='py-5'>
                
            </div>
        </Modal>
    )
}

export default VehicleTrimLevelForm