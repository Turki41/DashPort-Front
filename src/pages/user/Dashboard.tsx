import { House, Loader2, Pencil, PencilOff } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import Input from "../../components/Input"
import { useEffect, useState } from "react"
import LinksInputList from "../../components/LinksInputList"
import AdminView from "../../components/AdminView"
import { editHero, getHero } from "../../features/hero/heroSlice"
import toast from "react-hot-toast"

const Dashboard = () => {
  const { user } = useAppSelector(state => state.auth)
  const { isFetching, isUpdatingHero } = useAppSelector(state => state.hero)
  const dispatch = useAppDispatch()

  const [edit, setEdit] = useState(false)
  const [heroId, setHeroId] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [links, setLinks] = useState(['...'])

  const fetchHero = async () => {
    try {
      const hero = await dispatch(getHero()).unwrap()

      setHeroId(hero._id)
      setName(hero.name)
      setTitle(hero.title)
      setDescription(hero.description)
      setLinks(hero.links)

    } catch (error: any) {
      toast.error(error)
    }
  }

  const handleHeroEdit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        title,
        description,
        links,
        heroId,
      }

      await dispatch(editHero(data)).unwrap()
      await fetchHero()

      toast.success('Hero updated')
    } catch (error: any) {
      return toast.error(error)
    }
  }


  useEffect(() => {

    fetchHero()

  }, [dispatch])
  return (
    <DashboardLayout>
      <h1 className="text-3xl mb-1 font-bold">Hey {user?.name}!</h1>
      <p className="mb-2 text-gray-400">Personal information</p>

      <form onSubmit={handleHeroEdit}>

        <div className="card relative">
          {(isFetching || isUpdatingHero) && <div className="absolute top-0 left-0 rounded-xl z-40 bg-black/40 w-full h-full items-center justify-center flex">
            <Loader2 className="animate-spin " />
          </div>}

          <div className="flex flex-col w-full gap-4">

            <div className="flex justify-between items-center">

              <div className="flex gap-2 items-center">
                <House className="text-secondary" />
                <h3 className="text-xl font-semibold">Hero section</h3>
              </div>

              <div>
                <AdminView>
                  <div className="flex gap-2">
                    {edit &&
                      <button disabled={isUpdatingHero} type="submit" className="w-full bg-primary py-2 rounded-full hover:bg-primary/90 transition-all duration-200 text-white text-[16px] font-semibold px-4 disabled:opacity-60">
                        Save
                      </button>}
                    <button type="button" onClick={() => setEdit(!edit)} className="btn-secondary flex gap-1 items-center">
                      {edit ?
                        (<div className="px-2 gap-1 flex">
                          <PencilOff className="size-5" />
                          <p className="font-semibold">Cancel</p>
                        </div>)
                        :
                        (<div className="px-2 flex gap-1 items-center">
                          <Pencil className="size-5" />
                          <p className="font-semibold">Edit</p>
                        </div>)}
                    </button>
                  </div>
                </AdminView>
              </div>

            </div>

            <div className="flex w-full gap-3">
              <Input editable={edit} name="name" type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} label="Name" />
              <Input editable={edit} name="title" type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} label="Title" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm " htmlFor="description">Description</label>
              <textarea disabled={!edit} name="description" id="description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} className="border border-gray-300 px-2 py-0.5 rounded-lg resize-none overflow-auto bg-[#f9f4ff]/50 focus:ring-1 h-20 focus:ring-secondary transition-all duration-200 outline-none" />
            </div>

            <div>
              <LinksInputList links={links} setLinks={setLinks} />
            </div>

          </div>

        </div>

      </form>
    </DashboardLayout>
  )
}

export default Dashboard