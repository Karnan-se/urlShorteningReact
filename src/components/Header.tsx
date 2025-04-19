
import { LogOut } from "lucide-react"
import { Logout } from "../features/api/restApi"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { userLogout } from "../features/slices/authSlice"

export default function Header() {
    const dispatch = useDispatch()

  const handleLogout = async() => {
  try {
    const response = await Logout()
    dispatch(userLogout())
    toast.success(response.message)
    
     
    
  } catch (error) {
    console.log(error)
    
  }
    console.log("Logging out...")
  }

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="h-9 w-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">URL</span>
        </div>
        <span className="font-medium text-gray-800">Url Shortener</span>
      </div>

      <button
        onClick={handleLogout}
        className="group relative overflow-hidden px-4 py-2 rounded-md bg-white border border-gray-200 hover:border-red-200 text-gray-700 hover:text-red-600 transition-all duration-300"
      >
        <div className="absolute inset-0 w-3 bg-gradient-to-r from-red-200 to-red-100 group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-20"></div>
        <div className="relative flex items-center space-x-2">
          <span className="font-medium">Logout</span>
          <LogOut className="h-4 w-4" />
        </div>
      </button>
    </header>
  )
}
