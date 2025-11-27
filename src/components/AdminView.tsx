import { useAppSelector } from "../app/hooks"

const AdminView = ({ children }: { children: React.ReactNode }) => {
    const {user} = useAppSelector(state => state.auth)

    
    return (
        <>
        {user?.role === import.meta.env.VITE_R && (
            <div>
                {children}
            </div>
        )}
        </>
    )
}

export default AdminView