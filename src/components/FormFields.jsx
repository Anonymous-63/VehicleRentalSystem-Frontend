import { DatePicker, Form, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useField } from "formik"
import { useState } from "react";

export const InputField = ({ label, icon, maxLength, showCount = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helper] = useField(props);
    return (
        <Form.Item label={label} required={required}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={
                meta.touched && meta.error ? errors[props.name] : null
            }
        >
            <Input prefix={icon} showCount={showCount} maxLength={maxLength} disabled={disabled} placeholder={`Enter ${label}...`}
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
            <Input.Password prefix={icon} showCount={showCount} maxLength={maxLength} disabled={disabled} placeholder={`Enter ${label}...`}
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

export const SelectField = ({ label, options, showSearch = false, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <Form.Item label={label} required={required}
            help={
                meta.touched && meta.error ? (
                    <span className="text-red-500 font-normal">
                        {errors[props.name]}
                    </span>
                ) : null
            }
        >
            <Select value={field?.value ?? undefined} defaultValue={options.length > 0 ? options[0].value : undefined} options={options} showSearch={showSearch} optionFilterProp="children" disabled={disabled}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                onSelect={(value) => {
                    helpers.setTouched(true);
                    helpers.setValue(value);
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={`Select ${label}...`}
                {...props}
            />
        </Form.Item>
    );
};

export const DateField = ({ label, picker, showTime, format, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [selectedDatetime, setSelectedDatetime] = useState(field.value);

    return (
        <Form.Item label={label} required={required}
            help={
                meta.touched && meta.error ? (
                    <span className="text-red-500 font-normal">
                        {errors[props.name]}
                    </span>
                ) : null
            }
        >
            <DatePicker value={selectedDatetime} showTime={showTime} picker={picker} disabled={disabled} format={format}
                onCalendarChange={(value) => {
                    setSelectedDatetime(value);
                    helpers.setValue(value)
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={`Select ${label}...`}
                {...props}
                className="w-full"
            />
        </Form.Item>
    );
}

export const DatetimeRangeField = ({ label, picker, showTime, format, required = false, disabled = false, errors, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [selectedDatetime, setSelectedDatetime] = useState(field.value);
    return (
        <Form.Item label={label} required={required}
            help={
                meta.touched && meta.error ? (
                    <span className="text-red-500 font-normal">
                        {errors[props.name]}
                    </span>
                ) : null
            }
        >
            <DatePicker.RangePicker value={selectedDatetime} showTime={showTime} picker={picker} disabled={disabled} format={format}
                onCalendarChange={(value) => {
                    setSelectedDatetime(value);
                    helpers.setValue(value)
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={`Select ${label}...`}
                {...props}
                className="w-full"
            />
        </Form.Item>
    );
}

