interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="flex-1 relative max-w-[47vw] hidden -z-50 sm:flex w-full h-screen bg-cover bg-[url(/bg.png)]">
                <div className="absolute -z-40 bg-black top-0 w-full h-full opacity-65" />
                <div className="absolute bg-primary -top-20 -left-24 w-80 h-80 blur-3xl rounded-full opacity-15" />
                <div className="absolute bg-secondary -bottom-20 -right-16 w-80 h-80 blur-3xl rounded-full opacity-15" />

                <div className="flex flex-col w-full h-full items-center justify-center mx-10">
                    <h2 className="text-white text-4xl font-serif font-semibold text-start w-full opacity-90">DashPort</h2>
                    <h2 className="text-2xl text-start w-full text-secondary opacity-70">take control of your achievements in one place.</h2>
                </div>
            </div>
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout