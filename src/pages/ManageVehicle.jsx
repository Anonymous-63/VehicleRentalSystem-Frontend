import React from 'react'
import ManageGrid from '../components/AgGrid/ManageGrid'
import PageHeader from '../layouts/PageHeader'
import { Layout } from 'antd'
import { FaUsers } from 'react-icons/fa6'
import { Content } from 'antd/es/layout/layout'

const ManageVehicle = () => {
    return (
        <Layout className='h-full'>
            <PageHeader title={"Manage Vehicle"} icon={<FaUsers />} />
            <Content className='flex m-3 shadow-2xl'>
                <ManageGrid rowData={[]} columnDefs={[]} pagination={true} />
            </Content>
        </Layout>
    )
}

export default ManageVehicle