import React, { useState } from 'react'
import { Separator } from './ui/separator'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ComputerIcon from '@mui/icons-material/Computer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from './ui/button';
import { Post } from 'models';
import { formatMultipleLineText } from '@/lib/TextUtil';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useSession } from '@/contexts/AuthProvider';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ApplicationForm from './ApplicationForm';
import ApplicantsList from './ApplicantsList';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from '@mui/material';
import { JobUtil } from '@/lib/JobUtil';
import { useToast } from './ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { useJobs } from '@/contexts/JobProvider';
import UpdateJobForm from './UpdateJobForm';



const formatEligibility = (value: string): string => {
    switch (value) {
        case "HYBRID":
            return "Hybrid";
        case "ONSITE":
            return "On-site";
        case "REMOTE":
            return "Remote";
        default:
            return ""
    }
}

export default function JobCard({ data }: { data: Post }) {

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
    const { data: session } = useSession();
    const { toast } = useToast();
    const { setPosts, setDataCounts } = useJobs();
    const deletePost = async () => {
        try {
            await JobUtil.delete(data.id);
            setPosts((prev: Post[]) => {
                return prev.filter(item => item.id !== data.id);
            })
            setDataCounts(prev => ({ ...prev, totalCount: prev.totalCount - 1 }))
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive"
                })
            }
        }
    }

    return (
        <div className={cn('min-h-48 w-full bg-background shadow-sm shadow-input rounded-lg', {
            "opacity-40": !data.enabled,
            "cursor-not-allowed": !data.enabled
        })}>
            <div className='p-6 flex flex-col'>
                <h1 className='text-lg'> {data.title} <span className='text-primary/50 text-sm'>#{data.id}</span></h1>
                <div className='text-xs text-primary/60 flex justify-between flex-wrap'>
                    <div className='flex gap-x-4 flex-wrap'>
                        <div className='flex items-center gap-x-1'>
                            <LocationOnIcon />
                            {data.city} / {data.country}
                        </div>
                        <div className='flex items-center gap-x-1'>
                            <ComputerIcon />
                            {formatEligibility(data.eligibility)}
                        </div>
                    </div>
                    <div className='text-xs flex items-center gap-x-1 text-primary/60'>
                        <CalendarMonthIcon />
                        <span>{data.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
                <Separator className=' my-2' />
                <div className='description text-sm text-primary/70'>
                    <span className='font-semibold'>Description:</span> <br />
                    <ul>{formatMultipleLineText(data.description)}</ul>
                </div>
                <div className="card-footer w-full flex justify-end items-center gap-x-1">
                    {session && session.role === "HR" ?
                        <>
                            <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
                                <DialogTrigger asChild>
                                    <IconButton>
                                        <EditNoteIcon className='text-primary' />
                                    </IconButton>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit</DialogTitle>
                                        <UpdateJobForm data={data} setOpenDialog={setOpenUpdateDialog}/>
                                    </DialogHeader>
                                    
                                </DialogContent>
                            </Dialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <IconButton>
                                        <DeleteOutlineIcon className='text-primary' />
                                    </IconButton>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete a job post from our system.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='bg-destructive text-white' onClick={deletePost}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </> :
                        <></>
                    }

                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            {session && session.role === "HR" ? <Button>View Applications</Button> :
                                (data.enabled ? <Button className='h-8 rounded-sm w-32 bg-blue hover:bg-sky-800 text-white text-sm'>Apply</Button> :
                                    <></>)
                            }
                        </DialogTrigger>
                        {session ?
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{data.title} <span className='text-sm text-primary/50'>#{data.id}</span></DialogTitle>
                                </DialogHeader>
                                {session.role === "USER" ?
                                    <ApplicationForm setOpenDialog={setOpenDialog} post_id={data.id} /> :
                                    <ApplicantsList post_id={data.id} />
                                }

                            </DialogContent> :
                            <DialogContent className='w-full flex flex-col justify-center items-center'>
                                <DialogHeader>
                                    <DialogTitle>Log in now to apply numerous jobs!</DialogTitle>
                                </DialogHeader>
                                <Button className='w-full'><Link className='w-full h-full' href="/login">Log in</Link></Button>
                            </DialogContent>
                        }
                    </Dialog>
                </div>
            </div>
        </div>
    )
}


