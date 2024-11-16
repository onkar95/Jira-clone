import React from 'react'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const routes = [
    {
        lable: "Home",
        href: '',
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        lable: "Tasks",
        href: '/tasks',
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        lable: "Settings",
        href: '/settings',
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        lable: "Members",
        href: '',
        icon: UsersIcon,
        activeIcon: UsersIcon
    },
]

export const Navigation = () => {
    return (
        <ul className='flex flex-col'>
            {
                routes.map((item) => {
                    const isActive = false
                    const Icon = item.icon
                    return (
                        <Link key={item.href} href={item.href} >
                            <div className={cn(
                                "flex items-center gap-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className='size-5 text-neutral-500' />
                                {item.lable}
                            </div>
                        </Link>
                    )
                })
            }
        </ul>
    )
}

