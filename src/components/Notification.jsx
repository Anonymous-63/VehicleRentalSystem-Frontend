import { notification } from "antd"

export const successNotification = (message, description = null, duration = 3, pauseOnHover = false, threshold = 3) => {
    notification.success({
        message,
        description,
        duration,
        pauseOnHover,
        threshold
    })
}

export const errorNotification = (message, description = null, duration = 3, pauseOnHover = false, threshold = 3) => {
    notification.error({
        message,
        description,
        duration,
        pauseOnHover,
        threshold
    })
}