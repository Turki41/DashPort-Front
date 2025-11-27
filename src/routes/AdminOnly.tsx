import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { LoaderCircle } from "lucide-react"

interface PublicRouteProps {
    children: React.ReactNode
}

const AdminOnly = ({ children }: PublicRouteProps) => {
    const { user, isCheckingAuth } = useAppSelector(state => state.auth)

    if (isCheckingAuth) return <div className="w-screen h-screen flex items-center justify-center"><LoaderCircle className="animate-spin"/></div>

    if ((!user && !isCheckingAuth) || user?.role !== import.meta.env.VITE_R) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>

}

export default AdminOnly