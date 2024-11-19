// "use client ";

import { useCurrent } from '@/features/auth/api/use-current';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RiAddCircleFill } from 'react-icons/ri'
import workspaces from '@/features/workspaces/server/route';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';

export const WorkspaceSwitcher = () => {
    const { data: worspaces } = useGetWorkspaces()
// console.log(worspaces.documents[0])
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">workspaces</p>
                <RiAddCircleFill className="s54 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
            </div>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="No workspace selected" />
                </SelectTrigger>
                {/* <SelectContent className=''>
                    {workspaces && workspaces?.documents.map((workspace)=>(
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            {workspaces.name}
                        </SelectItem>
                    ))}

                </SelectContent> */}
            </Select>
            hello
        </div>
    )
}
