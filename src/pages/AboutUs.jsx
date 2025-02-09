import { Card, Col, Image, Layout, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
const { Title, Paragraph } = Typography;
import React from 'react'

const AboutUs = () => {
    return (
        <Layout className='h-full bg-surface'>
            <Content className='flex m-3 bg-accent shadow-2xl rounded-2xl'>
                <Row className='p-3 h-full items-center'>
                    <Col span={12} className='flex justify-center'>
                        <Typography>
                            <Title>About Us</Title>
                            <Paragraph>
                                Welcome to our car rental service! We provide a seamless and convenient way for customers to rent vehicles
                                with flexible options and competitive pricing. Our platform allows users to browse a variety of vehicles, book instantly,
                                and enjoy a hassle-free rental experience.
                            </Paragraph>

                            <Paragraph>
                                Our mission is to make car rentals accessible and efficient, ensuring customer satisfaction with well-maintained vehicles,
                                transparent pricing, and excellent customer support. Whether you need a car for business, travel, or leisure,
                                our system offers the perfect solution.
                            </Paragraph>
                        </Typography>
                    </Col>
                    <Col span={12} className='flex justify-center'>
                        <Image
                            width={600}
                            src="https://images.unsplash.com/photo-1602830364184-bcb58aa7d374?q=80&w=3202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default AboutUs