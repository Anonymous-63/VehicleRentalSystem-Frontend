import { Layout, notification } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '../layouts/PageHeader'
import { Content } from 'antd/es/layout/layout'
import ManageGrid from '../components/AgGrid/ManageGrid'
import { FaUsers } from 'react-icons/fa6'
import { deleteEntity, get, getAll } from '../api/EntityOperatioon'
import UserForm from './forms/UserForm'
import { successMessage } from '../components/ApiMessage'

const ManageUser = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs] = useState(colDefs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState();

    useEffect(() => {
        getAllUser().then(data => {
            setRowData(data);
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
        getUser(id).then(data => {
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
            deleteUser(ids).then((result) => {
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
            <PageHeader title={"Manage User"} icon={<FaUsers />} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <Content className='flex m-3 shadow-2xl'>
                <ManageGrid gridRef={gridRef} rowData={rowData} columnDefs={columnDefs} handleUpdate={handleUpdate} />
            </Content>
            <UserForm isModalOpen={isModalOpen} closeModal={closeModal} fieldValue={fieldValue} />
        </Layout>
    )
}

const colDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "About", field: "about", sortable: true, filter: true },
];

export async function getAllUser() {
    try {
        const response = await getAll("/user");
        if (response.status) {
            return response.data;
        }
    } catch (error) {
        console.error(error);

    }
}

export async function getUser(id) {
    try {
        const response = await get("/user/:id", id);
        if (response.status) {
            return response.data
        }
    } catch (error) {
        console.error(error);

    }
}

export async function deleteUser(ids) {
    try {
        const response = await deleteEntity("/user", ids);
        return response;
    } catch (error) {
        console.error(error);

    }
}

export default ManageUser