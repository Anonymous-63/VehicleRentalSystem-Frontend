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
import { getDataFromLocalStorage } from '../utils/storage'
import { USER_PREFIX } from '../utils/Constants'
import dayjs from 'dayjs'

const Booking = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState(colDefs);
  const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();
  const user = getDataFromLocalStorage(USER_PREFIX);
  useEffect(() => {
    if (user?.role === "admin") {
      getAllBooking(getAllEntity).then(result => {
        if (result.status) {
          setRowData(result.data);
        } else {
          errorNotif(result.message);
        }
      }).catch(error => {
        errorNotif(error.message);
      })
    } else {
      getBookingsByUserId(getEntity, user?.id).then(result => {
        if (result.status) {
          if (result?.data?.length > 0) {
            setRowData(result.data);
          }
        } else {
          errorNotif(result.message);
        }
      }).catch(error => {
        errorNotif(error.message)
      })
    }

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

const BookingDateRenderer = (param) => {
  return dayjs(param?.value).format("YYYY-MM-DD HH:mm:ss");
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

const PaymentRenderer = (params) => {
  return <Tag color="processing" className='font-semibold'>{params.value}</Tag>
}

const colDefs = [
  { headerName: "Booking Status", field: "bookingStatus", sortable: true, filter: true, cellRenderer: BookingStatusRenderer },
  { headerName: "Booking Id", field: "bookingId", sortable: true, filter: true },
  { headerName: "Booking From Date", field: "bookingFromDate", sortable: true, filter: true, cellRenderer: BookingDateRenderer },
  { headerName: "Booking To Date", field: "bookingToDate", sortable: true, filter: true, cellRenderer: BookingDateRenderer },
  { headerName: "User Name", field: "user.name", sortable: true, filter: true },
  { headerName: "User Email", field: "user.email", sortable: true, filter: true },
  { headerName: "Vehicle License Plate", field: "vehicle.licensePlate", sortable: true, filter: true },
  { headerName: "Vehicle Brand", field: "vehicle.brand.brand", sortable: true, filter: true },
  { headerName: "Vehicle Model", field: "vehicle.model.model", sortable: true, filter: true },
  { headerName: "Price", field: "price", sortable: true, filter: true, cellRenderer: PaymentRenderer },
];

export async function getAllBooking(getAllEntity) {
  try {
    return await getAllEntity("/booking");
  } catch (error) {
    throw error;
  }
}

export const getBookingsByUserId = async (getEntity, userId) => {
  try {
    return await getEntity("/booking/user/:id", userId);
  } catch (error) {
    throw error;
  }
}

export default Booking