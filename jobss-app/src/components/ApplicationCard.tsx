import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from './ui/button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Application } from 'models';
import { ApplicationUtil } from '@/lib/ApplicationUtil';
import { toast } from './ui/use-toast';
import { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import UpdateForm from './UpdateForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ApplicationCard({ data, setApplications }: { data: Application, setApplications: Dispatch<SetStateAction<Application[]>> }) {

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const deleteApplication = async () => {
        await ApplicationUtil.delete(data.id);
        setApplications(prev => {
            return prev.filter(item => item.id !== data.id);
        });
        toast({
            title: "Succesful!",
            description: "You have succesfully removed your application!"
        })
    }

    return (
        <div className='min-w-[350px] bg-background shadow-md shadow-input rounded-lg p-4 flex'>
            <div className="status-container w-full flex flex-col justify-center items-center">
                <StatusIcon status={data.status} />
            </div>
            <div className='application-content text-xs text-primary/60 w-full flex flex-col '>
                <div className='flex flex-col items-center gap-x-1'>
                    <span className='text-sm'>#{data.jobPost.id}</span>
                    <h1 className='text-base text-primary'>{data.jobPost.job_title}</h1>
                </div>
                <div className='flex flex-col items-end '>
                    <div className='text-xs flex items-center gap-x-1 text-primary/60'>
                        <CalendarMonthIcon />
                        <span>Applied in: {data.createdAt.substring(0, 10)}</span>
                    </div>
                    <section className='flex gap-x-1 mt-4'>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className='h-8 bg-destructive text-white hover:text-background flex justify-center items-center'>
                                    Delete <DeleteOutlineIcon />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        application from our system.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='bg-destructive text-white' onClick={deleteApplication}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger>
                                <Button className='h-8 bg-blue hover:bg-foreground text-white hover:text-background justify-center items-center'>
                                    Edit <EditNoteIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <UpdateForm data={data} setOpenDialog={setOpenDialog} />
                            </DialogContent>
                        </Dialog>

                    </section>

                </div>

            </div>
        </div>
    )
}

const StatusIcon = ({ status }: { status: string }) => {
    if (status === "PENDING") {
        return (
            <>
                <HourglassBottomIcon className='!w-16 !h-16' />
                <span className='font-bold text-sm'>Pending...</span>

            </>
        )

    } else if (status === "VERIFIED") {
        return (
            <>
                <CheckCircleOutlineIcon className='text-green-600 !w-16 !h-16' />
                <span className='font-bold text-sm'>Verified</span>
            </>
        )

    } else if (status === "REJECTED") {
        return (
            <>
                <CancelIcon className='!w-16 !h-16 text-destructive' />
                <span className='font-bold text-sm'>Rejected</span>
            </>
        )

    }
    return;
}