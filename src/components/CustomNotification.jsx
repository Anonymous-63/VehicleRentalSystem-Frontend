import { notification } from "antd"

export const successNotif = (message = "Success", description = null, duration = 3) => {
    notification.success({
        message,
        description,
        duration,
    })
}

export const errorNotif = (message = "Error", description = null, duration = 3) => {
    notification.error({
        message,
        description,
        duration,
    })
}

export const warningNotif = (message = "Warning", description = null, duration = 3) => {
    notification.warning({
        message,
        description,
        duration,
    })
}

export const infoNotif = (message = "Info", description = null, duration = 3) => {
    notification.info({
        message,
        description,
        duration,
    })
}