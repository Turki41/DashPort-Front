import { Link2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import Input from "./Input"
import AdminView from "./AdminView";

interface LinksInputListProps {
    links?: string[]
    setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const LinksInputList = ({ links = [], setLinks }: LinksInputListProps) => {
    const [newLink, setNewLink] = useState('')

    const handleDeleteLink = (link: string) => {
        return setLinks(links.filter((item) => item !== link))
    }

    const handleAddLink = () => {
        if (!newLink.trim()) {
            return
        }

        setLinks([...links, newLink])
        setNewLink('')
    }

    return (
        <div>
            <p className="text-sm mb-1">Links</p>

            <AdminView>
                <div className="flex items-center justify-between mb-3">
                    <Input name="newLink" type="text" value={newLink} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLink(e.target.value)} />
                    <button type="button" onClick={handleAddLink} className="btn-secondary ml-1">
                        <Plus />
                    </button>
                </div>
            </AdminView>

            {links.map((link, index) => (
                <div key={index} className="flex gap-3 items-center mb-2">
                    <Link2 className="size-6" />

                    <div className="input px-2">
                        <p className="max-w-[calc(100vw-18rem)] md:max-w-[calc(100vw-33rem)] truncate">{link}</p>
                    </div>

                    <AdminView>
                        <button type="button" onClick={() => handleDeleteLink(link)}>
                            <Trash2 className="size-[21px] hover:text-red-500 transition-all duration-100" />
                        </button>
                    </AdminView>
                </div>
            ))}

        </div>
    )
}

export default LinksInputList