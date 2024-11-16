"use client"

import React from 'react'
import { useCurrent } from '../api/use-current'
import { Loader, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { DottedSeparator } from '@/components/dotted-separator'
import { useLogout } from '../api/use-logout'

export const UserButton = () => {
    const { mutate } = useLogout()
    const { data: user, isLoading } = useCurrent()
    if (isLoading) {

        return (
            <div className='size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300'>
                <Loader className='size-4 animate-spin text-muted-foreground' />
            </div>
        )
    }
    if (!user) {
        return null;
    }
    const { name, email } = user
    const avatarFallBack = name ? name.charAt(0).toUpperCase() :
        email.charAt(0).toUpperCase() ?? "U";

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>

                <Avatar className='size-10 hover:opacity-75 transition border border-neutral-300'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'>
                        {avatarFallBack}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='bottom' className='w-60' sideOffset={10}>
                <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
                    <Avatar className='size-[52px] border border-neutral-300'>
                        <AvatarFallback className='bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center'>
                            {avatarFallBack}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-sm font-medium text-neutral-900'>
                            {name || "User"}
                        </p>
                        <p>{email}</p>
                    </div>
                    <DottedSeparator className='mb-1' />
                    <DropdownMenuItem className='h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer'
                        onClick={() => mutate()}>
                        <LogOut className='size-4 mr-2' />
                        Log out
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

