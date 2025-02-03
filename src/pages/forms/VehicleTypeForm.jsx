import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import FormHeader from '../../components/FormHeader';
import { Formik } from 'formik';
import { InputField, SelectField, TextAreaField } from '../../components/FormFields';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { setFormStatus } from '../../store/features/formStatusSlice';
import FormFooter from '../../components/FormFooter';
import { useEntityOperation } from '../../hooks/useEntityOperation';
import { getAllModels } from '../ManageVehicleModel';
import { getAllBrands } from '../ManageVehicleBrand';

const VehicleTypeForm = (props) => {
    const dispatch = useDispatch();
    const { addEntity } = useEntityOperation();
    const { isModalOpen, closeModal, formValues } = props;

    const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();
    const [options, setOptions] = useState();

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/type", values).then(result => {
            if (result.status) {
                successNotif(result.message);
                setSubmitting(false);
                closeModal();
            } else {
                errorNotif(result.message);
            }
        }).catch(error => {
            errorNotif(error.message);
        }).finally(() => {
            dispatch(setFormStatus());
        })
    }

    const resetForm = (props) => {
        props.resetForm();
    }

    useEffect(() => {
        getAllModels(getAllEntity).then(result => {
            if (result.status) {
                if (result.data) {
                    const options = result.data.map(model => ({
                        label: model.model,
                        value: model.id
                    }))
                    setOptions(options);
                }
            } else {
                errorNotif(result.message);
            }
        }).catch(error => {
            errorNotif(error.message);
        })
    }, [])

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                (props) => (
                    <Modal open={isModalOpen} onCancel={closeModal} closable={false} maskClosable={false} footer={<FormFooter handleReset={() => resetForm(props)} />}
                        afterOpenChange={open => {
                            if (open && formValues) {
                                props.setValues(formValues)
                            } else {
                                resetForm(props);
                            }
                        }}
                    >
                        <FormHeader title={formValues ? "Update Type" : "Add Type"} closeModal={closeModal} />
                        <Form layout='vertical' autoComplete='off' className='pt-3' >
                            <InputField label={"Type Name"} name="type" required showCount errors={props.errors} />
                            <SelectField name="modelId" label={"Model"} options={options} required errors={props.errors} />
                            <InputField label={"Vehicle Class"} name="vehicleClass" required showCount errors={props.errors} />
                            <InputField label={"Engine Type"} name="engineType" required showCount errors={props.errors} />
                            <TextAreaField label={"description"} name="description" showCount errors={props.errors} />
                        </Form>
                    </Modal>
                )
            }
        </Formik >
    )
}

const initialValues = {
    type: "",
    modelId: "",
    vehicleClass: "",
    engineType: "",
    description: "",
}
const validationSchema = Yup.object().shape({
    type: Yup
        .string()
        .min(1, ({ min }) => `At least ${min} characters required.`)
        .max(20, ({ }) => `Maximum ${max} characters allowed.`)
        .matches(/^[a-zA-Z0-9\s]+$/, "Only letters, number and spaces are allowed.")
        .required("Required"),
    modelId: Yup.string().required("Required"),
    vehicleClass: Yup.string().required("Required"),
    engineType: Yup.string().required("Required"),
    description: Yup
        .string()
        .max(200, ({ max }) => `Maximum ${max} characters allowed.`)

})

export default VehicleTypeForm