"use client"
import React from 'react';
import Logo from './Logo';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from '@/contexts/AuthProvider';
import Image from 'next/image';
import { removeCookie } from 'typescript-cookie';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import CreateJobDialog from './CreateJobDialog';
import BlackListDialog from './BlackListDialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function Navbar() {

    const { data: session, setData, isLoading } = useSession();
    const theme = useTheme();
    const router = useRouter();

    const signOut = () => {
        removeCookie("user-session");
        setData(null);
        router.replace("/login");
    }

    return (
        <header className='fixed w-full z-50 top-0 h-14 px-6 bg-background text-foreground/60 border-[1px]'>
            <div className="flex items-center navbar-content h-full w-full xl:w-[1080px] m-auto ">
                <Logo />
                <div className="relative ml-2 search-container h-10 w-[20vw] min-w-[80px] rounded-md">
                    <SearchIcon className='absolute top-2 left-3' />
                    <Input placeholder='Search something...' className='text-sm w-full h-[95%] bg-input/70 rounded-md pl-10 pr-4 focus-visible:ring-sky-700' />
                </div>
                <nav className='ml-auto h-full text-sm'>
                    <ul className='flex h-full'>
                        {isLoading ?
                            [...Array(3)].map((_, idx) => (
                                <li key={idx} className='h-full w-20'>
                                    <div className='h-full flex flex-col items-center justify-center gap-y-1'>
                                        <Skeleton className='bg-input rounded-full w-8 h-8' />
                                        <Skeleton className='bg-input w-10 h-2' />
                                    </div>
                                </li>
                            ))
                            :
                            <>
                                <li className='h-full w-20'>
                                    <Link className='h-full flex flex-col items-center justify-center' href={"/"}>
                                        <HomeIcon />
                                        Home
                                    </Link>
                                </li>
                                {session && session.role === "USER" ?
                                    <li className='h-full w-20'>
                                        <Link className='h-full flex flex-col items-center justify-center' href={"/profile"}>
                                            <Image
                                                className='rounded-full'
                                                src={session.picture ?? "/hr-logo.png"}
                                                alt='avatar'
                                                height={28}
                                                width={28}
                                            />
                                            Profile
                                        </Link>
                                    </li> :
                                    session && session.role === "HR" ?
                                        <li className='h-full w-20 flex flex-col justify-center items-center'>
                                            <Popover>
                                                <PopoverTrigger className='flex flex-col items-center'>
                                                    <Image
                                                        className='rounded-full'
                                                        src={"/hr-logo.png"}
                                                        alt='avatar'
                                                        height={28}
                                                        width={28}
                                                    />
                                                    HR
                                                </PopoverTrigger>
                                                <PopoverContent className='w-40 flex flex-col gap-y-2 p-1'>
                                                    <CreateJobDialog />
                                                    <BlackListDialog />
                                                </PopoverContent>
                                            </Popover>

                                        </li> :
                                        <></>
                                }
                                {session ?
                                    <li className='h-full w-20'>
                                        <div onClick={signOut} className='icon-button h-full flex flex-col items-center justify-center cursor-pointer'>
                                            <LogoutIcon />
                                            Logout
                                        </div>
                                    </li> :
                                    <li className='h-full w-20'>
                                        <Link className='h-full flex flex-col items-center justify-center' href={"/login"}>
                                            <LoginIcon />
                                            Login
                                        </Link>
                                    </li>
                                }
                                <li className='h-full w-20'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='h-full w-full flex flex-col justify-center items-center'>
                                            <SettingsIcon />
                                            Settings
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className='flex gap-x-2'>
                                                {theme.resolvedTheme == "light" ? <div onClick={() => theme.setTheme("dark")}>Dark mode <DarkModeIcon /></div>
                                                    : <div onClick={() => theme.setTheme("light")}>Light mode <LightModeIcon /> </div>
                                                }

                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            </>

                        }
                    </ul>
                </nav>
            </div>
        </header >
    )
}
