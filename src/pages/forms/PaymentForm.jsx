import { Button, Form, Input, Modal, Select, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react'

const PaymentForm = ({ visible, onCancel, onSuccess }) => {

    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState("credit");

    const handlePayment = async () => {
        try {
            await form.validateFields();
            message.success("Payment successful!");
            onSuccess();
            form.resetFields();
        } catch (error) {
            message.error("Please check the form fields.");
        }
    };

    return (
        <Modal
            title="Complete Payment"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="pay" type="primary" onClick={handlePayment}>
                    Pay Now
                </Button>,
            ]}
        >
            <Tabs defaultActiveKey="credit" onChange={setPaymentMethod}>
                {/* Credit Card / Debit Card */}
                <TabPane tab="Credit/Debit Card" key="credit">
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Card Number"
                            name="cardNumber"
                            rules={[{ required: true, message: "Please enter your card number!" }]}
                        >
                            <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                        </Form.Item>
                        <Form.Item
                            label="Expiry Date"
                            name="expiry"
                            rules={[{ required: true, message: "Please enter expiry date!" }]}
                        >
                            <Input placeholder="MM/YY" maxLength={5} />
                        </Form.Item>
                        <Form.Item
                            label="CVV"
                            name="cvv"
                            rules={[{ required: true, message: "Please enter CVV!" }]}
                        >
                            <Input placeholder="123" maxLength={3} />
                        </Form.Item>
                    </Form>
                </TabPane>

                {/* UPI */}
                <TabPane tab="UPI" key="upi">
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="UPI ID"
                            name="upiId"
                            rules={[{ required: true, message: "Please enter your UPI ID!" }]}
                        >
                            <Input placeholder="yourname@upi" />
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default PaymentForm