import { Pencil, Trash2 } from "lucide-react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addCert, deleteCert, editCert, getCerts } from "../../features/certificates/certificateSlice"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import AdminView from "../../components/AdminView"
import Modal from "../../components/Modal"
import Input from "../../components/Input"

interface Certificate {
    _id: string,
    name: string,
    sub: string,
    date?: string,
    num?: string,
}

const Certificates = () => {
    const { certificates, isCreatingCert, isUpdatingCert, isDeletingCert } = useAppSelector(state => state.certificate)
    const dispatch = useAppDispatch()

    const [openModal, setOpenModal] = useState(false)
    const [selectedCert, setSelecetedCert] = useState<Certificate>()

    const [name, setName] = useState('')
    const [sub, setSub] = useState('')
    const [date, setDate] = useState('')

    const handleAddCertificate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const cert = {
                _id: '',
                name,
                sub,
                date,
            }

            await dispatch(addCert(cert)).unwrap()
            clearFormInputs()
        } catch (error: any) {
            toast.error(error)
        }
    }

    const handleEditCert = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!selectedCert) return
            await dispatch(editCert({ ...selectedCert, name, sub, date })).unwrap()
            clearFormInputs()
            return toast.success('Updated')
        } catch (error: any) {
            return toast.error(error)
        }
    }

    const handleDeleteCert = async (certId: string) => {
        try {
            await dispatch(deleteCert(certId))
        } catch (error: any) {
            return toast.error(error)
        }
    }

    const openEditModal = (cert: Certificate) => {
        setName(cert.name)
        setSub(cert.sub)
        if (cert.date) {
            setDate(cert.date)
        }

        setSelecetedCert(cert)
        setOpenModal(true)
    }

    const fetchCerts = async () => {
        try {
            await dispatch(getCerts()).unwrap()
        } catch (error: any) {
            toast.error(error)
        }
    }

    const clearFormInputs = () => {
        setName('')
        setSub('')
        setDate('')

        setSelecetedCert(undefined)
        setOpenModal(false)
    }

    useEffect(() => {
        fetchCerts()
    }, [dispatch])

    return (
        <DashboardLayout>
            <Modal openModal={openModal} setOpenModal={clearFormInputs} >
                <div className='flex flex-1 flex-col gap-2'>
                    <div>
                        <h1 className='text-xl font-bold'>Add New Certificate</h1>
                        <p className='text-gray-400'>fill all the details to add a new Certificate</p>
                    </div>

                    <form onSubmit={selectedCert ? handleEditCert : handleAddCertificate}>
                        <div className=' flex flex-col gap-2'>
                            <Input name='name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type='text' value={name} label='Name' />
                            <Input name='sub' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSub(e.target.value)} type='text' value={sub} label='Sub' />
                            <Input name='date' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} type='text' value={date} label='Date' />
                        </div>

                        <div className='w-full flex gap-2 items-center justify-end mt-4'>
                            <button disabled={isCreatingCert || isUpdatingCert} type='button' onClick={() => clearFormInputs()} className='border px-4 py-2 rounded-full bg-gray-200'>Cancel</button>
                            <button disabled={isCreatingCert || isUpdatingCert} type='submit' className='bg-primary px-6 py-2 rounded-full text-white disabled:opacity-50'>{selectedCert ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>

                </div>
            </Modal>

            <div className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-3xl mb-1 font-bold">Certificates</h1>
                    <p className="mb-2 text-gray-400">manage your training and certificates.</p>
                </div>

                <AdminView>
                    <button onClick={() => setOpenModal(true)} className="bg-secondary px-3 py-2 rounded-full text-white font-semibold hover:bg-secondary/80 transition-colors">Add Certificate</button>
                </AdminView>
            </div>


            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 border-b border-gray-300">
                    <tr className="grid grid-cols-3 py-1">
                        <th className="text-left px-4 py-2 text-gray-600">Title</th>
                        <th className="text-left px-4 py-2 text-gray-600">Issuer</th>
                        <th className="text-left px-4 py-2 text-gray-600">Date</th>
                    </tr>
                </thead>

                <tbody className="w-full">
                    {certificates.map((cert, index) => (
                        <tr key={index} className="border-b grid grid-cols-3 py-1 relative border-gray-200">
                            <td className="px-4 py-2">{cert.name}</td>
                            <td className="px-4 py-2">{cert.sub}</td>
                            <td className="px-4 py-2">{cert.date}</td>
                            <AdminView>
                                <div className="absolute flex gap-2.5 right-1.5 top-3.5">
                                    <button onClick={() => openEditModal(cert)}><Pencil className="size-5 hover:text-blue-500 transition-colors" /></button>
                                    <button onClick={() => handleDeleteCert(cert._id)} disabled={isDeletingCert}><Trash2 className="size-5 hover:text-red-500 transition-colors" /></button>
                                </div>
                            </AdminView>
                        </tr>
                    ))}

                </tbody>

            </table>

        </DashboardLayout>
    )
}

export default Certificates