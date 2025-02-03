import { Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '../layouts/PageHeader'
import { Content } from 'antd/es/layout/layout'
import ManageGrid from '../components/AgGrid/ManageGrid'
import { FaUsers } from 'react-icons/fa6'
import UserForm from './forms/UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotif, successNotif, warningNotif } from '../components/CustomNotification'
import { setFormStatus } from '../store/features/formStatusSlice'
import { useEntityOperation } from '../hooks/useEntityOperation'

const ManageUser = () => {
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
        getAllUser(getAllEntity).then(result => {
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
        getUser(getEntity, id).then(result => {
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
            deleteUser(deleteEntity, ids).then((result) => {
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
            <PageHeader title={"Manage User"} icon={<FaUsers />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <Content className='flex m-3 shadow-2xl rounded-2xl'>
                <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
            </Content>
            <UserForm isModalOpen={isModalOpen} closeModal={closeModal} formValues={formValues} />
        </Layout>
    )
}

const colDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "About", field: "about", sortable: true, filter: true },
];

export async function getAllUser(getAllEntity) {
    try {
        return await getAllEntity("/user");
    } catch (error) {
        throw error;
    }
}

export async function getUser(getEntity, id) {
    try {
        return await getEntity("/user/:id", id);
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(deleteEntity, ids) {
    try {
        return await deleteEntity("/user", ids);
    } catch (error) {
        throw error;
    }
}

export default ManageUser