import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import toast from 'react-hot-toast'

// 1. Statically import the necessary icon libraries
import * as RiIcons from 'react-icons/ri'
import * as TbIcons from 'react-icons/tb'
import * as SiIcons from 'react-icons/si'
import * as BiIcons from 'react-icons/bi'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addTechnology, deleteTechnology, editTechnology, getTechnologies } from '../../features/technologies/techSlice'
import AdminView from '../../components/AdminView'
import Modal from '../../components/Modal'
import Input from '../../components/Input'

interface Technology { label: string, name: string, library: string, color: string, _id: string; }

const Technologies = () => {
    const { isUpdatingTech, isDeletingTech } = useAppSelector(state => state.tech)
    const dispatch = useAppDispatch()

    const [label, setLabel] = useState('')
    const [name, setName] = useState('')
    const [library, setLibrary] = useState('')
    const [color, setColor] = useState('')

    const [update, setUpdate] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [technologies, setTechnologies] = useState<Technology[]>([])
    const [selectedTech, setSelectedTech] = useState<Technology>();

    // 2. Icon library map
    const iconLibraries: Record<string, any> = {
        'react-icons/ri': RiIcons,
        'react-icons/tb': TbIcons,
        'react-icons/si': SiIcons,
        'react-icons/bi': BiIcons,
    }

    const handleAddTechnology = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = {
                label,
                name,
                library,
                color,
                _id: ''
            }

            await dispatch(addTechnology(data)).unwrap()
            fetchTech()
            setOpenModal(false)
        } catch (error: any) {
            toast.error(error)
        }
    }

    const handleEditTech = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = {
                label,
                name,
                library,
                color,
                _id: selectedTech!._id
            }

            await dispatch(editTechnology(data)).unwrap()
            setOpenModal(false)
            clearFormInputs()
            fetchTech()

        } catch (error: any) {
            toast.error(error)
        }
    }

    const handleDeleteTech = async (techId: string) => {
        try {
            await dispatch(deleteTechnology(techId)).unwrap()
            fetchTech()
        } catch (error: any) {
            toast.error(error)
        }
    }

    const openEditModal = (tech: Technology) => {
        setSelectedTech(tech)
        setLabel(tech.label)
        setName(tech.name)
        setLibrary(tech.library)
        setColor(tech.color)

        setUpdate(true)
        setOpenModal(true)
    }

    const clearFormInputs = () => {
        setOpenModal(false)
        setLabel('')
        setName('')
        setLibrary('')
        setColor('')
        setUpdate(false)
    }

    const fetchTech = async () => {
        try {
            const techs = await dispatch(getTechnologies()).unwrap()

            setTechnologies(techs)
        } catch (error: any) {
            toast.error(error)
        }
    }

    useEffect(() => {
        fetchTech()
    }, [dispatch])

    return (
        <DashboardLayout>

            <Modal openModal={openModal} setOpenModal={clearFormInputs} >
                <div className='flex flex-col gap-2'>
                    <div>
                        <h1 className='text-xl font-bold'>Add New Technology</h1>
                        <p className='text-gray-400'>fill all the details to add a new technology</p>
                    </div>

                    <form onSubmit={update ? handleEditTech : handleAddTechnology}>
                        <div className=' flex flex-col gap-2'>
                            <Input name='label' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)} type='text' value={label} label='Label' />
                            <Input name='name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type='text' value={name} label='Name' />
                            <Input name='library' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLibrary(e.target.value)} type='text' value={library} label='Library' />
                            <Input name='color' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)} type='text' value={color} label='Color' />
                        </div>

                        <div className='w-full flex gap-2 items-center justify-end mt-4'>
                            <button disabled={isUpdatingTech} type='button' onClick={() => clearFormInputs()} className='border px-4 py-2 rounded-full bg-gray-200'>Cancel</button>
                            <button disabled={isUpdatingTech} type='submit' className='bg-primary px-6 py-2 rounded-full text-white disabled:opacity-50'>{update ? 'Update' : 'Add'}</button>
                        </div>
                    </form>

                </div>
            </Modal>

            <div>
                <h1 className="text-3xl mb-1 font-bold">Technologies</h1>
                <p className="mb-2 text-gray-400">manage your technologies and libraries.</p>

                <div className="">

                    <div className='flex flex-wrap gap-4'>

                        {technologies.map((tech, index) => {
                            const library = iconLibraries[tech.library]
                            const Icon = library ? library[tech.name] : null

                            return (
                                <div key={index} className="bg-white h-40 w-40 rounded-t-xl rounded-b-lg flex items-center justify-center shadow-md hover:shadow-xl transition-shadow hover:border border-gray-600 relative">
                                    <div className='flex flex-col  justify-center items-center'>
                                        <Icon className='size-10' style={{ color: tech.color }} />
                                        <span className='text-xl font-semibold'>{tech.label}</span>
                                    </div>
                                    <div className='absolute bottom-0 h-1 w-full rounded-b-lg' style={{ background: tech.color }} />
                                    <AdminView>
                                        <div className='flex items-center gap-2'>
                                            <button disabled={isDeletingTech} className='w-full flex items-center hover:text-red-500 transition-colors' onClick={() => handleDeleteTech(tech._id)}><Trash2 /></button>
                                            <button className='w-full flex items-center hover:text-blue-500 transition-colors' onClick={() => openEditModal(tech)}><Pencil /></button>
                                        </div>
                                    </AdminView>
                                </div>
                            )
                        })}

                        <AdminView>
                            <button onClick={() => setOpenModal(true)} className='w-full h-16 rounded-2xl border border-black bg-[#e6e4e9] gap-2 px-2 border-dashed flex items-center justify-center'>
                                <Plus className='size-10' />
                            </button>
                        </AdminView>

                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Technologies
