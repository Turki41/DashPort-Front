import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex w-screen h-screen overflow-hidden'>
            <div>
                <Sidebar />
            </div>

            <div className='flex flex-col w-full h-full p-4 overflow-auto'>
                <div className='max-sm:flex flex-col max-sm:items-center max-sm:justify-center p-10 sm:p-3'>
                    <Outlet/>{children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout