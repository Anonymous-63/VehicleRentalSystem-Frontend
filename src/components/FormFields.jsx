import { DatePicker, Form, Input, InputNumber, Select } from "antd"

export const InputField = (props) => {
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