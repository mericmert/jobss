import React from 'react'
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
    full_name : z.string().optional()
  })

export default function ApplicationForm({ post_id, setOpenDialog }: { post_id: number, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { data: session } = useSession();


    const handleSubmit = async () => {
        const values = form.getValues();
        try {
            await ApplicationUtil.apply({
                ...values,
                full_name: session?.given_name
            }, session?.id, post_id);
            setOpenDialog(false);
            toast({
                title: "Succesful!",
                description: "You have succesfully submitted your application!"
            })
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    title: "Application Error!",
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
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input disabled autoComplete="off" defaultValue={session?.given_name} className="rounded-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="school"
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

                <Button className="w-full bg-sky-700 hover:bg-sky-900 text-white" type="submit">Apply Now</Button>
            </form>
        </Form>
    )
}
