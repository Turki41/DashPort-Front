import { House, FolderGit2, LayoutGrid, ScrollText } from "lucide-react"

interface SidebarTapsProps {
    label: string,
    path: string,
    icon: React.ElementType,
}


export const SIDEBAR_TAPS: SidebarTapsProps[] = [
    { label: 'Main', path: '/dashboard', icon: House },
    { label: 'Technologies', path: '/dashboard/technologies', icon: LayoutGrid },
    { label: 'Projects', path: '/dashboard/projects', icon: FolderGit2 },
    { label: 'Certificates', path: '/dashboard/certificates', icon: ScrollText },
]
