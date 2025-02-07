import { Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '../layouts/PageHeader'
import { Content } from 'antd/es/layout/layout'
import ManageGrid from '../components/AgGrid/ManageGrid'
import { FaUsers } from 'react-icons/fa6'
import VehicleBrandForm from './forms/VehicleBrandForm'
import { useDispatch, useSelector } from 'react-redux'
import { setFormStatus } from '../store/features/formStatusSlice'
import { errorNotif, successNotif, warningNotif } from '../components/CustomNotification'
import { useEntityOperation } from '../hooks/useEntityOperation'



const ManageVehicleBrand = () => {
  const gridRef = useRef();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState(colDefs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState();

  const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();

  const closeModal = () => {
    setFormValues();
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllBrands(getAllEntity).then(result => {
      if (result.status) {
        setRowData(result.data);
      } else {
        errorNotif(result.message);
      }
    }).catch(error => {
      errorNotif(error.message);
    })
  }, [useSelector(store => !store.formStatus)])

  const handleAdd = () => {
    setFormValues();
    setIsModalOpen(true);
  };

  const handleUpdate = (data) => {
    let id = data?.id;
    if (id === undefined) {
      const rowCount = gridRef?.current?.props?.rowData?.length;
      if (rowCount === 1) {
        id = gridRef?.current?.props?.rowData[0]?.id;
      } else {
        const selectedRows = gridRef.current.api.getSelectedRows();
        if (selectedRows.length > 0) {
          if (selectedRows.length === 1) {
            id = selectedRows[0].id;
          } else {
            warningNotif("Please select only one row.");
          }
        } else {
          errorNotif("Please select any row to update.");
        }
      }
    }
    if (id === undefined) return;
    getBrand(getEntity, id).then(result => {
      if (result.status) {
        setFormValues(result.data);
        setIsModalOpen(true);
      } else {
        errorNotif(result.message);
      }
    }).catch(error => {
      errorNotif(error.message);
    }).finally(() => {
      dispatch(setFormStatus());
    });
  }

  const handleDelete = () => {
    const selectedRows = gridRef?.current?.api?.getSelectedRows();
    if (selectedRows.length > 0) {
      const ids = selectedRows.map((row) => {
        return row.id;
      });
      deleteBrand(deleteEntity, ids).then((result) => {
        if (result.status) {
          successNotif('Deleted successfully');
        } else {
          errorNotif("Failed to delete.");
        }
      }).catch(error => {
        errorNotif(error.message);
      }).finally(() => {
        dispatch(setFormStatus());
      })
    } else {
      warningNotif("Please select atleast one row.");
    }
  }

  return (
    <Layout className='h-full bg-accent'>
      <PageHeader title={"Manage Vehicle Brand"} icon={<FaUsers />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      <Content className='flex m-3 shadow-2xl rounded-2xl'>
        <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
      </Content>
      <VehicleBrandForm isModalOpen={isModalOpen} closeModal={closeModal} formValues={formValues} />
    </Layout>
  )
}

const ImageRenderer = (params) => {
  return (<img src={params.value} alt="Image" style={{ width: "50px", borderRadius: "5px" }} />);
};

const colDefs = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  { headerName: "Brand Logo", field: "logo", sortable: true, filter: true, cellRenderer: ImageRenderer, cellStyle: { display: "flex", justifyContent: "center", alignItems: "center" } },
  { headerName: "Brand Name", field: "brand", sortable: true, filter: true },
  { headerName: "Description", field: "description", sortable: true, filter: true },
];

export async function getAllBrands(getAllEntity) {
  try {
    return await getAllEntity("/brand");
  } catch (error) {
    throw error;
  }
}

export async function getBrand(getEntity, id) {
  try {
    return await getEntity("/brand/:id", id);
  } catch (error) {
    throw error;
  }
}

export async function deleteBrand(deleteEntity, ids) {
  try {
    return await deleteEntity("/brand", ids);
  } catch (error) {
    throw error;
  }
}

export default ManageVehicleBrand