import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { LoaderCircle } from "lucide-react"

interface PublicRouteProps {
    children?: React.ReactNode
}

const PrivateRoute = ({ children }: PublicRouteProps) => {
    const { user, isCheckingAuth, loading } = useAppSelector(state => state.auth)

    if (children && isCheckingAuth) return (<div className="w-screen h-screen flex items-center justify-center"><LoaderCircle className="animate-spin" /></div>)

    if (!user && !isCheckingAuth && !loading) {
        return <Navigate to="/" replace />
    }

    return <>{children}<Outlet /></>

}

export default PrivateRoute