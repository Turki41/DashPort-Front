import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { LoaderCircle } from "lucide-react"

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isCheckingAuth } = useAppSelector(state => state.auth)

  if (isCheckingAuth) return <div className="w-screen h-screen flex items-center justify-center"><LoaderCircle className="animate-spin"/></div>

  if (user && !isCheckingAuth) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>

}

export default PublicRoute