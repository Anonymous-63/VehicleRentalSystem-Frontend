import { Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ReportHeader from '../layouts/ReportHeader'
import { Content } from 'antd/es/layout/layout'
import ReportGrid from '../components/AgGrid/ReportGrid'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { errorNotif } from '../components/CustomNotification'
import { useEntityOperation } from '../hooks/useEntityOperation'

const Payment = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState(colDefs);
  const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();

  useEffect(() => {
    getAllPayment(getAllEntity).then(result => {
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
      <ReportHeader title={"Payment History"} icon={<FaFileInvoiceDollar />} />
      <Content className='flex m-3 shadow-2xl rounded-2xl'>
        <ReportGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} />
      </Content>
    </Layout>
  )
}

const colDefs = [
  { headerName: "Payment Id", field: "paymentId", sortable: true, filter: true },
  { headerName: "Booking Id", field: "booking.bookingId", sortable: true, filter: true },
  { headerName: "User Name", field: "user.name", sortable: true, filter: true },
  { headerName: "User Email", field: "user.email", sortable: true, filter: true },
  { headerName: "Vehicle License Plate", field: "booking.vehicle.licensePlate", sortable: true, filter: true },
  { headerName: "Vehicle Brand", field: "booking.vehicle.brand.brand", sortable: true, filter: true },
  { headerName: "Vehicle Model", field: "booking.vehicle.model.model", sortable: true, filter: true },
  { headerName: "Payment Transaction Id", field: "transactionId", sortable: true, filter: true },
  { headerName: "Payment Type", field: "paymentType", sortable: true, filter: true },
  { headerName: "Payment Amount", field: "amount", sortable: true, filter: true },
];

export async function getAllPayment(getAllEntity) {
  try {
    return await getAllEntity("/payment");
  } catch (error) {
    throw error;
  }
}


export default Payment