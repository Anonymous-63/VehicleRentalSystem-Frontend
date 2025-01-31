import { Layout } from 'antd'
import React from 'react'
import PageHeader from '../layouts/PageHeader'
import { Content } from 'antd/es/layout/layout'
import ManageGrid from '../components/AgGrid/ManageGrid'
import { FaUsers } from 'react-icons/fa6'

const ManageVehicleBrand = () => {
  return (
    <Layout className='h-full'>
            <PageHeader title={"Manage Vehicle Brand"} icon={<FaUsers />} />
            <Content className='flex m-3 shadow-2xl'>
                <ManageGrid rowData={[]} columnDefs={[]} pagination={true} />
            </Content>
        </Layout>
  )
}

export default ManageVehicleBrand