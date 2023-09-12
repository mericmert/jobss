import { UserUtil } from '@/lib/UserUtil';
import React, { useState } from 'react'
import { toast } from './ui/use-toast';
import { ApplicationUtil } from '@/lib/ApplicationUtil';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';

export default function Blacklist({params} : {params: any}) {
    const [blacklisted, setBlacklisted] = useState<any>(params.row.blacklisted);

    const blacklist = async (id: number) => {
        try {
            let user = await UserUtil.blacklist(id, true);
            toast({
                title: "Successful!",
                description: `You have blacklisted ${user.full_name} `
            });
            await ApplicationUtil.deleteApplicationsByUser(id);
            setBlacklisted(true);
        } catch (err) {
            console.log(err);

        }
    }

    const removeBlacklist = async (id: number) => {
        try {
            let user = await UserUtil.blacklist(id, false);
            toast({
                title: "Successful!",
                description: `You have removed ${user.full_name} from blacklist.`
            });
            setBlacklisted(false);
        } catch (err) {
            console.log(err);

        }

    }
    return (
        blacklisted ?
            <Button onClick={() => removeBlacklist(params.row.id)} className='h-8 bg-primary/30'>Blacklisted</Button> :
            <AlertDialog>
                <AlertDialogTrigger asChild disabled={blacklisted}>
                    <Button className='h-8 flex justify-center items-center'>
                        Blacklist
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all
                            application of the given user and blacklists him from our system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => blacklist(params.row.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

    )
}

