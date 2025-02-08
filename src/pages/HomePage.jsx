import { Carousel, Layout } from 'antd'
import React from 'react'
import MainHeader from '../layouts/MainHeader'


const images = [
    "https://wallpapers.com/images/featured/toyota-imnbe3zw5b732jwy.jpg",
    "https://images.unsplash.com/photo-1632414187391-7e4097f0de6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1578659258511-4a4e7dee7344?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const HomePage = () => {
    return (
        <Layout className='h-full'>
            <Carousel autoplay arrows className='h-full'>
                {images.map((src, index) => (
                    <div key={index} className="flex h-[48rem] justify-center items-center">
                        <img src={src} alt={`Slide ${index + 1}`} className="w-full object-cover" />
                    </div>
                ))}
            </Carousel>
        </Layout>
    )
}

export default HomePage