import React, { useEffect, useRef, useState } from 'react'
import { successMessage } from '../components/ApiMessage';
import { Layout } from 'antd';
import PageHeader from '../layouts/PageHeader';
import { Content } from 'antd/es/layout/layout';
import ManageGrid from '../components/AgGrid/ManageGrid';
import VehicleModelForm from './forms/VehicleModelForm';
import { FaCar } from 'react-icons/fa6';
import { useEntityOperation } from '../hooks/useEntityOperation';
import { useDispatch, useSelector } from 'react-redux';

const ManageVehicleModel = () => {
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
        getAllModels(getAllEntity).then(result => {
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
        getModel(getEntity, id).then(result => {
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
            deleteModel(deleteEntity, ids).then((result) => {
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
            <PageHeader title={"Manage User"} icon={<FaCar />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <Content className='flex m-3 shadow-2xl rounded-2xl'>
                <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
            </Content>
            <VehicleModelForm isModalOpen={isModalOpen} closeModal={closeModal} formValues={formValues} />
        </Layout>
    )
}

const colDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    { headerName: "Brand", field: "brand", sortable: true, filter: true },
    { headerName: "Description", field: "description", sortable: true, filter: true },
];

export async function getAllModels(getAllEntity) {
    try {
        return await getAllEntity("/model");
    } catch (error) {
        throw error;
    }
}

export async function getModel(getEntity, id) {
    try {
        return await getEntity("/model/:id", id);
    } catch (error) {
        throw error;
    }
}

export async function deleteModel(deleteEntity, ids) {
    try {
        return await deleteEntity("/model", ids);
    } catch (error) {
        throw error;
    }
}


export default ManageVehicleModel