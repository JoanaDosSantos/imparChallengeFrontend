import { toast } from "react-toastify";

export function emmitToaster(type: 'success' | 'warn' | 'error', message: string, closingTime: number = 5000) {
    toast[type](message, {
        position: "top-right",
        autoClose: closingTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
} 