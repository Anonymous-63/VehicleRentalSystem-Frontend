import { message as msg } from "antd"

export const successMessage = (message) => {
    msg.success({
        content: message,
    })
}