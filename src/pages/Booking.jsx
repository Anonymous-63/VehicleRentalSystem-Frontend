import { Layout, Tag } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useRef, useState } from 'react'
import { FaFileSignature } from 'react-icons/fa6'
import PageHeader from '../layouts/PageHeader'
import ReportHeader from '../layouts/ReportHeader'
import ReportGrid from '../components/AgGrid/ReportGrid'
import { useDispatch, useSelector } from 'react-redux'
import { useEntityOperation } from '../hooks/useEntityOperation'
import { getAllUser } from './ManageUser'
import { errorNotif } from '../components/CustomNotification'

const Booking = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState(colDefs);
  const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();

  useEffect(() => {
    getAllBooking(getAllEntity).then(result => {
      if (result.status) {
        setRowData(result.data);
      } else {
        errorNotif(result.message);
      }
    }).catch(error => {
      errorNotif(error.message);
    })
  }, [])

  return (
    <Layout className='h-full bg-accent'>
      <ReportHeader title={"Booking history"} icon={<FaFileSignature />} />
      <Content className='flex m-3 shadow-2xl rounded-2xl'>
        <ReportGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} />
      </Content>
    </Layout>
  )
}


const BookingStatusRenderer = (params) => {
  const status = params.value;
  let statusColor;
  switch (status) {
    case "APPROVED":
      statusColor = "green-inverse";
      break;
    case "PENDING":
      statusColor = "blue-inverse";
      break;
    case "REJECTED":
      statusColor = "red-inverse";
      break;
    default:
      break;
  }
  return <Tag color={statusColor} className='font-semibold'>{params.value}</Tag>
}

const colDefs = [
  { headerName: "Booking Id", field: "bookingId", sortable: true, filter: true },
  { headerName: "User Name", field: "user.name", sortable: true, filter: true },
  { headerName: "User Email", field: "user.email", sortable: true, filter: true },
  { headerName: "Vehicle License Plate", field: "vehicle.licensePlate", sortable: true, filter: true },
  { headerName: "Vehicle Brand", field: "vehicle.brand.brand", sortable: true, filter: true },
  { headerName: "Vehicle Model", field: "vehicle.model.model", sortable: true, filter: true },
  { headerName: "Price", field: "price", sortable: true, filter: true },
  { headerName: "Booking Status", field: "bookingStatus", sortable: true, filter: true, cellRenderer: BookingStatusRenderer },
];

export async function getAllBooking(getAllEntity) {
  try {
    return await getAllEntity("/booking");
  } catch (error) {
    throw error;
  }
}

export default Booking