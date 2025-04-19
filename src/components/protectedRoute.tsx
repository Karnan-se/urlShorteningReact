import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from '../features/stores/store'





export default function UserPrivateRoute() {

    const userInfo = useSelector((state: RootState) => state.user.userInfo)


    return userInfo ? <Outlet /> : <Navigate to={"/login"} />
}