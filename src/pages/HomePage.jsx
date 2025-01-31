import { Carousel, Layout } from 'antd'
import React from 'react'
import MainHeader from '../layouts/MainHeader'

const HomePage = () => {
    return (
        <Layout>
            <MainHeader />
            <Carousel arrows infinite={false}>
                <div>
                    <h3 className='h-96 bg-cyan-600'>1</h3>
                </div>
                <div>
                    <h3 className='h-96 bg-blue-600' >2</h3>
                </div>
                <div>
                    <h3 className='h-96 bg-red-600'>3</h3>
                </div>
                <div>
                    <h3 className='h-96 bg-green-600' >4</h3>
                </div>
            </Carousel>
        </Layout>
    )
}

export default HomePage