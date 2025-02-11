import { Button, Layout, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import { FaFileSignature } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEntityOperation } from "../hooks/useEntityOperation";
import { errorNotif, successNotif } from "../components/CustomNotification";
import dayjs from "dayjs";
import ReportHeader from "../layouts/ReportHeader";
import ReportGrid from "../components/AgGrid/ReportGrid";
import { setFormStatus } from "../store/features/formStatusSlice";

const Booking = () => {
  const gridRef = useRef();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const { getEntity, getAllEntity, updateEntity, deleteEntity } = useEntityOperation();

  // Get the user from Redux instead of local storage
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role === "admin") {
      getAllBooking(getAllEntity)
        .then((result) => {
          if (result.status) {
            setRowData(result.data);
          } else {
            errorNotif(result.message);
          }
        })
        .catch((error) => {
          errorNotif(error.message);
        });
    } else {
      getBookingsByUserId(getEntity, user?.id)
        .then((result) => {
          if (result.status && result?.data?.length > 0) {
            setRowData(result.data);
          } else {
            errorNotif(result.message);
          }
        })
        .catch((error) => {
          errorNotif(error.message);
        });
    }
  }, [useSelector(store => !store.formStatus)]); // Re-fetch data when user changes

  const cancelBooking = async (params) => {
    try {
      return await updateEntity(`/booking/cancel/${params.bookingId}`, params).then(result => {
        if (result.status) {
          successNotif(result.message);
          dispatch(setFormStatus());
        } else {
          errorNotif(result.message);
        }
      });
    } catch (error) {
      errorNotif(error.message);
    }
  }

  const confirmBooking = async (params) => {
    try {
      return await updateEntity(`/booking/confirm/${params.bookingId}`, params).then(result => {
        if (result.status) {
          successNotif(result.message);
          dispatch(setFormStatus());
        } else {
          errorNotif(result.message);
        }
      });
    } catch (error) {
      errorNotif(error.message);
    }
  }

  return (
    <Layout className="h-full bg-accent">
      <ReportHeader title={"Booking history"} icon={<FaFileSignature />} />
      <Content className="flex m-3 shadow-2xl rounded-2xl">
        <ReportGrid gridRef={gridRef} rowData={rowData} columnDefs={colDefs(cancelBooking, confirmBooking)} />
      </Content>
    </Layout>
  );
};

const BookingDateRenderer = (param) => {
  return dayjs(param?.value).format("YYYY-MM-DD HH:mm:ss");
};

const BookinStatusRenderer = (param) => {
  const status = param.data.bookingStatus;
  let color = "";
  switch (status) {
    case 'PENDING':
      color = "blue-inverse";
      break;
    case 'CONFIRM':
      color = "green-inverse";
      break;
    case 'REJECTED':
      color = "red-inverse";
      break;
    default:
      color = "default";
      break;
  }
  return (<Tag color={color} className="font-semibold text-sm">{status}</Tag>)
}

const BookingActionRenderer = ({ params, cancelBooking, confirmBooking }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="space-x-2">
      {
        (params.data.bookingStatus === "PENDING" || params.data.bookingStatus === "CONFIRM") && (<Button variant="solid" color="danger" className="font-semibold" onClick={() => cancelBooking(params.data)}>Cancel</Button>)
      }
      {(user?.role === "admin" && params.data.bookingStatus === "PENDING") && (
        <Button variant="solid" color="green" className="font-semibold" onClick={() => confirmBooking(params.data)}>Confirm</Button>
      )}
    </div>
  );
};

const PaymentRenderer = (params) => {
  return <Tag color="processing" className="font-semibold">{params.value}</Tag>;
};

const colDefs = (cancelBooking, confirmBooking) => [
  { headerName: "Booking Action", sortable: true, filter: true, cellRenderer: (params) => <BookingActionRenderer params={params} cancelBooking={cancelBooking} confirmBooking={confirmBooking} /> },
  { headerName: "Booking Status", field: "bookingStatus", sortable: true, filter: true, cellRenderer: BookinStatusRenderer },
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
};



export default Booking;
