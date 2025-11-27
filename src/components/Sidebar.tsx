import { SidebarOpen, SidebarClose, LogOut, PanelsTopLeft } from "lucide-react";
import { useState } from "react";
import { SIDEBAR_TAPS } from "../constants/sidebarTaps";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";



const Sidebar = () => {
  const [open, setOpen] = useState(() => {
    return window.innerWidth >= 640; // sm and up → open, small screens → closed
  });

  const { loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate('/')
      return toast.success('Logged out')
    } catch (error: any) {
      return toast.error(error)
    }
  }

  return (
    <>
      {/* Large Screen Sidebar */}
      <div className={`hidden sm:flex h-full p-2 flex-col overflow-hidden bg-white shadow-md transition-all duration-300 ${open ? "w-72" : "w-16"}`}>

        <div className="flex items-center border-b">
          <button onClick={() => setOpen(!open)} className="p-2 ml-1 rounded outline-none hover:bg-gray-100 transition">
            {open ? <SidebarClose /> : <SidebarOpen />}
          </button>

        </div>


        <div className="mt-6">
          {SIDEBAR_TAPS.map((item, index) => (
            <div className="flex flex-col my-1 w-full font-semibold" key={index}>
              <button className={`w-full pl-3 h-full outline-none rounded-full ${location.pathname === item.path ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-200'}`}>
                <a className="flex gap-2 py-3 items-center h-full justify-start w-full" href={item.path}>
                  <div><item.icon /></div>
                  <div><p className={`${open ? '' : 'hidden'}`}>{item.label}</p></div>
                </a>
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <button onClick={handleLogout} disabled={loading} className={`flex gap-2 font-semibold pl-3 items-center w-full outline-none py-2 rounded-full hover:bg-gray-200`}>
            <div><LogOut /></div>
            <div className={`${open ? '' : 'hidden'}`}><p>Logout</p></div>
          </button>
          <button className='bg-secondary py-3 w-full flex items-center gap-2 hover:bg-secondary/80 transition-colors duration-200 rounded-full text-white shadow-md font-semibold'>
            <a className="flex gap-2 items-center justify-center w-full" href="https://www.portfo.app/" target="_blank">
              <div><PanelsTopLeft /></div>
              <div className={`${open ? '' : 'hidden'} text-nowrap`}><p>View Live Protfolio</p></div>
            </a>
          </button>
        </div>
      </div>

      {/* Small Screen Sidebar (Drawer) */}
      <div className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-white flex flex-col justify-between p-2 shadow-md z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex items-center border-b">
          <button onClick={() => setOpen(!open)} className="p-2 rounded outline-none hover:bg-gray-100 transition">
            {open ? <SidebarClose /> : <SidebarOpen />}
          </button>

        </div>

        <div className="mt-4">
          {SIDEBAR_TAPS.map((item, index) => (
            <div className="flex flex-col my-1 w-full font-semibold" key={index}>
              <button className={`w-full transition-all duration-150 py-2 pl-3 rounded-full ${location.pathname === item.path ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-200'}`}>
                <a className="flex gap-2 items-center justify-start w-full" href={item.path}>
                  <div><item.icon /></div>
                  <div><p className={`${open ? '' : 'hidden'}`}>{item.label}</p></div>
                </a>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <button onClick={handleLogout} disabled={loading} className="flex gap-2 font-semibold items-center w-full pl-3 transition-all duration-150 py-2 rounded-full">
            <LogOut />
            <p>Logout</p>
          </button>
          <button className='bg-secondary py-2 w-full hover:bg-secondary/80 transition-colors duration-200 rounded-full px-7 text-white shadow-md font-semibold'>
            <a target="_blank" href="https://www.portfo.app/">View Live Protfolio</a>
          </button>
        </div>
      </div>


      {/* Floating Mobile Open Button */}
      {!open && (
        <button onClick={() => setOpen(true)} className="sm:hidden fixed top-4 left-4 z-40 p-2 bg-white shadow rounded-full hover:bg-gray-50">
          <SidebarOpen />
        </button>
      )}

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="sm:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}
    </>
  );
};

export default Sidebar;
