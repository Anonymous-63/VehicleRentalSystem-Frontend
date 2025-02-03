import { Form, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useField } from "formik"

export const InputField = ({ label, icon, maxLength, showCount = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helper] = useField(props);
    return (
        <Form.Item label={label} required={required}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={
                meta.touched && meta.error ? errors[props.name] : null
            }
        >
            <Input showCount={showCount} maxLength={maxLength} disabled={disabled} placeholder={`Enter ${label}...`}
                onBlur={() => helper.setTouched(true)} {...props}{...field}
            />
        </Form.Item>
    )
}

export const PasswordField = ({ label, icon, maxLength, showCount = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helper] = useField(props);
    return (
        <Form.Item label={label} required={required}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={
                meta.touched && meta.error ? errors[props.name] : null
            }
        >
            <Input.Password showCount={showCount} maxLength={maxLength} disabled={disabled} placeholder={`Enter ${label}...`}
                onBlur={() => helper.setTouched(true)} {...props}{...field}
            />
        </Form.Item>
    )
}

export const TextAreaField = ({ label, icon, maxLength, showCount = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helper] = useField(props);
    return (
        <Form.Item label={label} required={required}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={
                meta.touched && meta.error ? errors[props.name] : null
            }
        >
            <Input.TextArea showCount={showCount} maxLength={maxLength} disabled={disabled} placeholder={`Enter ${label}...`}
                onBlur={() => helper.setTouched(true)} {...props}{...field}
            />
        </Form.Item>
    )
}

export const SelectField = ({ label, icon, maxLength, showCount = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helper] = useField(props);
    return (
        <Form.Item label={label} required={required}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={
                meta.touched && meta.error ? errors[props.name] : null
            }
        >
            <Select
                {...field}
                {...props}
                onChange={value => {
                    helper.setValue(value)
                    helper.setTouched(true)
                }}
                onBlur={() => helper.setTouched(true)}
                value={field.value}
            />
        </Form.Item>
    )
}


