import {toast} from "react-hot-toast";

export const ToastSuccess = (msg) => {
    toast.success(msg,{
        position: "top-right",
    })
}

export const ToastError = (msg) => {
    toast.error(msg, {
        position: "top-right",
    })
}