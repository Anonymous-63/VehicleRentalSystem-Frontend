import { notification } from "antd"

export const successNotif = (description = null) => {
    notification.success({
        message: "Success",
        description,
        duration: 3,
    })
}

export const errorNotif = (description = null) => {
    notification.error({
        message: "Error",
        description,
        duration: 3,
    })
}

export const warningNotif = (description = null) => {
    notification.warning({
        message: "Warning",
        description,
        duration: 3,
    })
}

export const infoNotif = (description = null) => {
    notification.info({
        message: "Info",
        description,
        duration: 3,
    })
}