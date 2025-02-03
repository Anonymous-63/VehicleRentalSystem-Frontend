import { Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '../layouts/PageHeader'
import { Content } from 'antd/es/layout/layout'
import ManageGrid from '../components/AgGrid/ManageGrid'
import { FaCar, FaUsers } from 'react-icons/fa6'
import UserForm from './forms/UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotif, successNotif, warningNotif } from '../components/CustomNotification'
import { setFormStatus } from '../store/features/formStatusSlice'
import { useEntityOperation } from '../hooks/useEntityOperation'
import VehicleForm from './forms/VehicleForm'

const ManageVehicle = () => {
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
        getAllVehicles(getAllEntity).then(result => {
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
        getVehicle(getEntity, id).then(result => {
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
            deleteVehicle(deleteEntity, ids).then((result) => {
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
            <PageHeader title={"Manage Vehicle"} icon={<FaCar />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <Content className='flex m-3 shadow-2xl rounded-2xl'>
                <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
            </Content>
            <VehicleForm isModalOpen={isModalOpen} closeModal={closeModal} formValues={formValues} />
        </Layout>
    )
}

const colDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Brand", field: "brand.brand", sortable: true, filter: true },
    { headerName: "Model", field: "model.model", sortable: true, filter: true },
    { headerName: "Type", field: "type.type", sortable: true, filter: true },
    { headerName: "Color", field: "color", sortable: true, filter: true },
    { headerName: "License Plate", field: "licensePlate", sortable: true, filter: true },
    { headerName: "Fuel Type", field: "fuelType", sortable: true, filter: true },
    { headerName: "Transmission", field: "transmission", sortable: true, filter: true },
];

export async function getAllVehicles(getAllEntity) {
    try {
        return await getAllEntity("/vehicle");
    } catch (error) {
        throw error;
    }
}

export async function getVehicle(getEntity, id) {
    try {
        return await getEntity("/vehicle/:id", id);
    } catch (error) {
        throw error;
    }
}

export async function deleteVehicle(deleteEntity, ids) {
    try {
        return await deleteEntity("/vehicle", ids);
    } catch (error) {
        throw error;
    }
}


export default ManageVehicle