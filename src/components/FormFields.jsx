import { DatePicker, Form, Input, InputNumber, Select } from "antd"
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

export const InputFieldOld = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <Input />
        </Form.Item>
    )
}



export const PasswordField = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <Input.Password />
        </Form.Item>
    )
}

export const InputNumberField = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <InputNumber />
        </Form.Item>
    )
}
export const TextAreaField = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <Input.TextArea />
        </Form.Item>
    )
}

export const SelectField = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <Select />
        </Form.Item>
    )
}

export const DatePickerField = (props) => {
    const { label, name, rules = null } = props;
    return (
        <Form.Item label={label} name={name} rules={rules} >
            <DatePicker />
        </Form.Item>
    )
}