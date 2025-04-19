import axios from "axios"
import { configKeys } from "../../constant"
import { toast } from "sonner"
import { AxiosError } from "axios"



export const userApi = axios.create({
    baseURL : `${configKeys.BaseUrl}`,
    timeout:600000,
    withCredentials:true,
})
interface CustomErrorData {
    error: {
      message: string
    }
  }

userApi.interceptors.response.use((response)=> response, (error :AxiosError<CustomErrorData>)=>{
    if(error.response){
        const status = error.response.status;
        if(status == 403){
            console.log("userInfo going to be cleared")
            localStorage.removeItem("userInfo")
            toast.error("Session Expired")
            window.location.href = "/login"
        }
        const errorMsg = error.response.data?.error?.message || "Something went wrong"

        toast.error(errorMsg)
    }
    return Promise.reject(error)
})

