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
import { getAllBrands } from '../ManageVehicleBrand';
import { getAllModels } from '../ManageVehicleModel';
import { getAllTypes } from '../ManageVehicleType';

const VehicleForm = (props) => {
    const dispatch = useDispatch();
    const { addEntity } = useEntityOperation();
    const { isModalOpen, closeModal, formValues } = props;

    const { getEntity, getAllEntity, deleteEntity } = useEntityOperation();
    const [brandOptions, setBrandOptions] = useState();
    const [modelOptions, setModelOptions] = useState();
    const [typeOptions, setTypeOptions] = useState();

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/vehicle", values).then(result => {
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
        getAllBrands(getAllEntity).then(result => {
            if (result.status) {
                if (result.data) {
                    const options = result?.data?.map(brand => ({
                        label: brand.brand,
                        value: brand.id
                    }))
                    setBrandOptions(options);
                    getAllModels(getAllEntity).then(result => {
                        if (result.status) {
                            const options = result?.data?.map(model => ({
                                label: model.model,
                                value: model.id
                            }))
                            setModelOptions(options);
                            getAllTypes(getAllEntity).then(result => {
                                if (result.status) {
                                    if (result.data) {
                                        const options = result?.data?.map(type => ({
                                            label: type.type,
                                            value: type.id
                                        }))
                                        setTypeOptions(options);
                                    }
                                } else {
                                    errorNotif(result.message);
                                }
                            }).catch(error => {
                                errorNotif(error.message);
                            })
                        }
                    }).catch(error => {
                        errorNotif(error.message);
                    })
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
                        <FormHeader title={formValues ? "Update Vehicle" : "Add Vehicle"} closeModal={closeModal} />
                        <Form layout='vertical' autoComplete='off' className='pt-3' >
                            <SelectField name="brandId" label={"Brand"} options={brandOptions} required errors={props.errors} />
                            <SelectField name="modelId" label={"Model"} options={modelOptions} required errors={props.errors} />
                            <SelectField name="typeId" label={"Type"} options={typeOptions} required errors={props.errors} />
                            <InputField label={"Color"} name="color" required showCount errors={props.errors} />
                            <InputField label={"License Plate"} name="licensePlate" required showCount errors={props.errors} />
                            <InputField label={"Fuel Type"} name="fuelType" required showCount errors={props.errors} />
                            <InputField label={"Transmission"} name="transmission" required showCount errors={props.errors} />

                        </Form>
                    </Modal>
                )
            }
        </Formik >
    )
}

const initialValues = {
    brandId: "",
    modelId: "",
    typeId: "",
    color: "",
    licensePlate: "",
    fuelType: "",
    transmission: ""
}
const validationSchema = Yup.object().shape({
    brandId: Yup.string().required("Required"),
    modelId: Yup.string().required("Required"),
    typeId: Yup.string().required("Required"),
    color: Yup.string().required("Required"),
    licensePlate: Yup.string().required("Required"),
    fuelType: Yup.string().required("Required"),
    transmission: Yup.string().required("Required"),

})

export default VehicleForm