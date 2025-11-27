import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import AdminView from "../../components/AdminView"
import { CheckCheck, ExternalLink, Pencil, Trash2 } from "lucide-react"
import Modal from "../../components/Modal"
import Input from "../../components/Input"
import LinksInputList from "../../components/LinksInputList"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addProject, deleteProject, editProject, getProjects } from "../../features/porjects/projectSlice"
import toast from "react-hot-toast"

interface Project {
    _id: string,
    title: string,
    description: string,
    techStack: string[],
    siteUrl: string,
    img: string, // the secure url used to display the image from cloudinary.
    imgId?: string // the image id used for deleting the image from cloudinary when its no longer needed.
}

const Projects = () => {
    const { projects, isCreatingProject, isUpdatingProject, isDeletingProject } = useAppSelector(state => state.project)
    const dispatch = useAppDispatch()

    const [openModal, setOpenModal] = useState(false)
    const [selectedProject, setSelecetedProject] = useState<Project>()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [techStack, setTechStack] = useState<string[]>([])
    const [siteUrl, setSiteUrl] = useState('')
    const [imgBase64, setImgBase64] = useState('')

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const newProject = {
                _id: '',
                title,
                description,
                techStack,
                siteUrl,
                img: imgBase64
            }

            await dispatch(addProject(newProject))
            setOpenModal(false)
            clearFormInputs()
            return toast.success('Project Added')
        } catch (error: any) {
            return toast.error(error)
        }
    }

    const handleEditProject = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(selectedProject)
        if (!selectedProject) return

        try {
            const updatedProject = { ...selectedProject, img: imgBase64, title, description, techStack, siteUrl }
            await dispatch(editProject(updatedProject)).unwrap()
            setOpenModal(false)
            clearFormInputs()
            return toast.success('Project Updated')
        } catch (error: any) {
            return toast.error(error)
        }
    }

    const handleDeleteProject = async (project: Project) => {
        try {
            await dispatch(deleteProject(project))
            return toast.success('Project Deleted')
        } catch (error: any) {
            return toast.error(error)
        }
    }

    const openEditModal = (project: Project) => {

        setSelecetedProject(project)
        setTitle(project.title)
        setDescription(project.description)
        setTechStack(project.techStack)
        setSiteUrl(project.siteUrl)
        setImgBase64('')

        setOpenModal(true)
    }

    const clearFormInputs = () => {
        setTitle('')
        setDescription('')
        setTechStack([])
        setSiteUrl('')
        setImgBase64('')

        setSelecetedProject(undefined)
        setOpenModal(false)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImgBase64(reader.result as string)
        }

        reader.readAsDataURL(file)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                await dispatch(getProjects()).unwrap()
            } catch (error: any) {
                return toast.error(error)
            }
        }

        fetchProjects()
    }, [dispatch])

    return (
        <DashboardLayout>
            <Modal openModal={openModal} setOpenModal={clearFormInputs} >
                <div className='flex flex-1 flex-col gap-2'>
                    <div>
                        <h1 className='text-xl font-bold'>Add New Project</h1>
                        <p className='text-gray-400'>fill all the details to add a new Project</p>
                    </div>

                    <form onSubmit={selectedProject ? handleEditProject : handleAddProject}>
                        <div className=' flex flex-col gap-2'>
                            <div className="flex items-center justify-between">
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                                {imgBase64 && <CheckCheck />}
                            </div>
                            <Input name='title' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} type='text' value={title} label='Title' />
                            <Input name='description' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} type='text' value={description} label='Description' />
                            <Input name='siteUrl' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteUrl(e.target.value)} type='text' value={siteUrl} label='Site URL' />
                            <div className="overflow-auto max-h-40"><LinksInputList links={techStack} setLinks={setTechStack} /></div>
                        </div>

                        <div className='w-full flex gap-2 items-center justify-end mt-4'>
                            <button disabled={isCreatingProject || isUpdatingProject} type='button' onClick={() => clearFormInputs()} className='border px-4 py-2 rounded-full bg-gray-200'>Cancel</button>
                            <button disabled={isCreatingProject || isUpdatingProject} type='submit' className='bg-primary px-6 py-2 rounded-full text-white disabled:opacity-50'>{selectedProject ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>

                </div>
            </Modal>

            <div>

                <div className="flex w-full items-center justify-between">
                    <div>
                        <h1 className="text-3xl mb-1 font-bold">Projects</h1>
                        <p className="mb-2 text-gray-400">show your projects.</p>
                    </div>

                    <AdminView>
                        <button onClick={() => setOpenModal(true)} className="bg-secondary px-3 py-2 rounded-full text-white font-semibold hover:bg-secondary/80 transition-colors">Add Project</button>
                    </AdminView>
                </div>


                <div className="">

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
                        {projects.map((project: Project, index) => (
                            <div className="bg-white rounded-2xl flex flex-col relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-200" key={index}>
                                <img className="rounded-t-2xl object-cover w-full border-b" src={project.img} alt={project.title} />

                                <div className="absolute top-3 right-3">
                                    <AdminView>
                                        <button onClick={() => openEditModal(project)} className="bg-white/90 rounded-md hover:bg-gray-300 p-0.5 transition-colors mr-1.5"><Pencil className="p-0.5" /></button>
                                        <button onClick={() => handleDeleteProject(project)} disabled={isDeletingProject} className="bg-white/90 rounded-md hover:bg-gray-300 p-0.5 transition-colors"><Trash2 className="p-0.5 text-red-500" /></button>
                                    </AdminView>
                                </div>

                                <div className="w-full flex flex-col pt-4 px-3 items-start justify-start">
                                    <h2 className="text-xl font-semibold mb-4">{project.title}</h2>
                                    <p className="text-gray-600 break-words line-clamp-4">{project.description}</p>
                                </div>

                                <div className="flex gap-3 w-full justify-start h-20 px-3 my-4 flex-wrap flex-grow ">
                                    {project.techStack.map((tech, index) => (
                                        <div key={index} className={`w-20 max-h-9 rounded-xl border-2 text-[#612484] border-primary/20 bg-secondary-light/90`} >
                                            <span className="font-semibold items-center overflow-hidden py-0.5 justify-center flex">{tech}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href={project.siteUrl} className="flex gap-2 text-secondary mb-4 px-3 max-w-fit hover:text-secondary/80 transition-colors">
                                    <p>View Project</p>
                                    <ExternalLink />
                                </a>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </DashboardLayout>
    )
}

export default Projects