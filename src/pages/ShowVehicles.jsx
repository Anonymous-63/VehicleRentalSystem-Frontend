import { Col, Layout, Row } from 'antd'
import Search from 'antd/es/input/Search'
import { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import { useEntityOperation } from '../hooks/useEntityOperation'
import { errorNotif } from '../components/CustomNotification'
import VehicleBookingForm from './forms/VehicleBookingForm'

const ShowVehicles = () => {
  const { getAllEntity } = useEntityOperation();

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllVehicles(getAllEntity).then(result => {
      if (result.status) {
        if (result.data.length > 0) {
          console.log("vehicle", result);
          setVehicles(result.data);
        }
      }
    }).catch(error => {
      errorNotif(error.message);
    })
  }, [])

  return (
    <Layout className='h-full bg-accent'>
      <Header className='bg-slate-400 shadow-lg'>
        <div className='flex justify-between items-center h-full'>
          <span className="text-2xl font-bold flex items-center space-x-2">
            <span className="cursor-default">Available Cars</span>
          </span>
          <div className='flex gap-2'>
            <Search
              placeholder="Search Cars here..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={() => { }}
            />
          </div>
        </div>
      </Header>
      <Content className='h-full m-3 p-2 bg-white shadow-2xl rounded-2xl overflow-auto'>
        <Row gutter={[16, 16]}>
          {
            vehicles.map(vehicle => (
              <Col key={vehicle?.licensePlate} span={8} className='h-full'>
                <div className='h-full flex'>
                  <CarCard vehicle={vehicle} />
                </div>
              </Col>
            ))
          }
        </Row>
      </Content>
    </Layout>
  )
}

export async function getAllVehicles(getAllEntity) {
  try {
    return await getAllEntity("/vehicle");
  } catch (error) {
    throw error;
  }
}

export default ShowVehicles