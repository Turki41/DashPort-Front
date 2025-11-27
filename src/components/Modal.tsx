interface ModalProps {
    openModal: boolean,
    setOpenModal: any,
    children: React.ReactNode,
}

const Modal = ({ openModal, setOpenModal, children }: ModalProps) => {
    return (
        <>
            {openModal &&
                <div className="fixed h-full flex items-center justify-center w-full z-30 left-0 top-0 ">

                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpenModal()} />

                    <div onClick={(e) => e.stopPropagation()} className="z-50 flex bg-white max-w-md flex-1 card items-center justify-center">
                        {children}
                    </div>
                    
                </div>}
        </>
    )
}

export default Modal