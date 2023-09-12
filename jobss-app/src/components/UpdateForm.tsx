import React, { useState } from 'react'
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { useForm } from 'react-hook-form';
import { ApplicationUtil } from '@/lib/ApplicationUtil';
import { useSession } from '@/contexts/AuthProvider';
import { Button } from './ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Application } from 'models';
import { useApplication } from '@/contexts/ApplicationProvider';

const formSchema = z.object({
    school: z.string().min(2, {
        message: "School name must be at least 2 characters.",
    }),
    major: z.string().min(1, {
        message: "Major name cannot be empty!"
    }),
    cover_letter: z.string().min(20, {
        message: "Cover letter must be at least 20 characters."
    }),
    full_name: z.string().optional()
})

export default function UpdateForm({ setOpenDialog, data }: { setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, data: Application }) {

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { data: session } = useSession();
    const { setUpdate } = useApplication();

    const handleSubmit = async () => {
        const values = form.getValues();
        try {
            let updatedFormData: Application = await ApplicationUtil.update({
                ...values,
                full_name: session?.given_name
            }, data.id);
            setOpenDialog(false);
            setUpdate(prev => !prev);
            toast({
                title: "Succesful!",
                description: "You have succesfully updated your application!"
            })
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    title: "Application Update Error!",
                    description: err.message,
                    variant: "destructive"
                })
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full h-full flex flex-col gap-y-3">
                <FormField
                    control={form.control}
                    name="full_name"
                    defaultValue={session?.given_name}
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input disabled autoComplete="off" className="rounded-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="school"
                    defaultValue={data.school}
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>School</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className="rounded-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="major"
                    defaultValue={data.major}
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                                <Input placeholder='e.g Computer Science and Engineering' autoComplete="off" className="rounded-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cover_letter"
                    defaultValue={data.coverLetter}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Cover Letter</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Enter your cover letter' autoComplete="off" className="resize-none rounded-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full bg-sky-700 hover:bg-sky-900 text-white" type="submit">Update</Button>
            </form>
        </Form>
    )
}
