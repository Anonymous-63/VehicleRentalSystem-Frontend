import { Button, Form, Modal } from 'antd';
import React, { useEffect } from 'react'
import FormHeader from '../../components/FormHeader';
import { Formik } from 'formik';
import { InputField, SelectField, TextAreaField } from '../../components/FormFields';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { addEntity } from '../../api/EntityOperatioon';
import { errorNotif, successNotif } from '../../components/CustomNotification';
import { setFormStatus } from '../../store/features/formStatusSlice';
import FormFooter from '../../components/FormFooter';

const VehicleModelForm = (props) => {
    const dispatch = useDispatch();
    const { isModalOpen, closeModal, formValues } = props;

    const onSubmit = async (values, { setSubmitting }) => {
        addEntity("/model", values).then(result => {
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
                        <FormHeader title={formValues ? "Update Model" : "Add Model"} closeModal={closeModal} />
                        <Form layout='vertical' autoComplete='off' className='pt-3' >
                            <InputField label={"Model Name"} name="model" required showCount errors={props.errors} />
                            <SelectField name="brand" label={"Brand"} required errors={props.errors} />
                            <TextAreaField label={"description"} name="description" showCount errors={props.errors} />
                        </Form>
                    </Modal>
                )
            }
        </Formik >
    )
}

const initialValues = {
    brand: "",
    model: "",
    description: "",
}
const validationSchema = Yup.object().shape({
    brand: Yup.string().required("Required"),
    model: Yup
        .string()
        .min(1, ({ min }) => `At least ${min} characters required.`)
        .max(20, ({ }) => `Maximum ${max} characters allowed.`)
        .matches(/^[a-zA-Z0-9\s]+$/, "Only letters, number and spaces are allowed.")
        .required("Required"),
    description: Yup
        .string()
        .max(200, ({ max }) => `Maximum ${max} characters allowed.`)

})

export default VehicleModelForm