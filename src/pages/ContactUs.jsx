import { Card, Layout, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
const { Title, Paragraph } = Typography;

const ContactUs = () => {
    return (
        <>
            <Layout className='h-full bg-surface'>
                <Content className='flex m-3 p-3 bg-accent shadow-2xl rounded-2xl'>
                    <Typography>
                        <Title>Contact Us</Title>
                        <Paragraph>
                            If you have any questions, feedback, or inquiries, feel free to reach out to us. Our team is always here to assist you.
                        </Paragraph>

                        <Paragraph>
                            <strong>Email:</strong> contact@company.com
                        </Paragraph>
                        <Paragraph>
                            <strong>Phone:</strong> +123 456 7890
                        </Paragraph>
                        <Paragraph>
                            <strong>Address:</strong> 123 Business St, City, Country
                        </Paragraph>
                        <Paragraph>
                            Our office is open from Monday to Friday, 9 AM to 6 PM. We look forward to hearing from you!
                        </Paragraph>
                    </Typography>
                </Content>
            </Layout>
        </>
    )
}

export default ContactUs