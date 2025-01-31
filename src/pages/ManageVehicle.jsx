import React, { useEffect, useRef, useState } from 'react'
import ManageGrid from '../components/AgGrid/ManageGrid'
import PageHeader from '../layouts/PageHeader'
import { Layout } from 'antd'
import { FaCar, FaUsers } from 'react-icons/fa6'
import { Content } from 'antd/es/layout/layout'
import { successMessage } from '../components/ApiMessage'
import { deleteEntity, get, getAll } from '../api/EntityOperatioon'
import VehicleForm from './forms/VehicleForm'

const ManageVehicle = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs] = useState(colDefs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState();

    useEffect(() => {
        getAllVehicle().then(data => {
            setRowData(data);
            successMessage("User fetch");
        })
    }, [])

    const closeModal = () => {
        setFieldValue();
        setIsModalOpen(false)
    };
    const handleAdd = () => setIsModalOpen(true);

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
                        console.log("Please select only one row.");
                    }
                } else {
                    console.log("Please select any row to update.");
                }
            }
        }
        if (id === undefined) return;
        getVehicle(id).then(data => {
            if (data) {
                setFieldValue(data);
                setIsModalOpen(true);
            }
        }).catch(error => console.log(error));
    }

    const handleDelete = () => {
        const selectedRows = gridRef?.current?.api?.getSelectedRows();
        if (selectedRows.length > 0) {
            const ids = selectedRows.map((row) => {
                return row.id;
            });
            deleteVehicle(ids).then((result) => {
                if (result.status) {
                    console.log(`Deleted successfully`);
                } else {
                    console.error(`Failed to delete`);
                }
            }).catch((error) => {
                console.error(`Failed to delete.`);
            });
        } else {
            console.error("Please select atleast one row.");
        }
    }

    return (
        <Layout className='h-full'>
            <PageHeader title={"Manage Vehicle"} icon={<FaCar />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <Content className='flex m-3 shadow-2xl'>
                <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
            </Content>
            <VehicleForm isModalOpen={isModalOpen} closeModal={closeModal} fieldValue={fieldValue} />
        </Layout>
    )
}

const colDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Color", field: "color", sortable: true, filter: true },
    { headerName: "Fuel Type", field: "fuelType", sortable: true, filter: true },
    { headerName: "License Plate", field: "licensePlate", sortable: true, filter: true },
    { headerName: "Manufacture Year", field: "manufactureYear", sortable: true, filter: true },
    { headerName: "Transmission", field: "transmission", sortable: true, filter: true },
    { headerName: "Vehicle Reg Status", field: "vehicleRegStatus", sortable: true, filter: true },
];

export async function getAllVehicle() {
    try {
        const response = await getAll("/vehicle");
        if (response.status) {
            return response.data;
        }
    } catch (error) {
        console.error(error);

    }
}

export async function getVehicle(id) {
    try {
        const response = await get("/vehicle/:id", id);
        if (response.status) {
            return response.data
        }
    } catch (error) {
        console.error(error);

    }
}

export async function deleteVehicle(ids) {
    try {
        const response = await deleteEntity("/vehicle", ids);
        return response;
    } catch (error) {
        console.error(error);

    }
}

export default ManageVehicle