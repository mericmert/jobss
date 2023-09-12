import React, { Dispatch, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DateTimePicker } from './ui/DateTimePicker';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Post } from 'models';
import { JobUtil } from '@/lib/JobUtil';

const formSchema = z.object({
    title: z.string().nonempty("Title cannot be empty."),
    description: z.string().optional(),
    city: z.string().nonempty("City cannot be empty."),
    country: z.string().nonempty("Country cannot be empty."),
    eligibility: z.string().optional(),
    level: z.string().optional(),

})


export default function UpdateJobForm({ data, setOpenDialog }: { data: Post, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>> }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { toast } = useToast();
    const [activationDate, setActivationDate] = useState<Date>(new Date(data.activationTime));
    const [deadline, setDeadline] = useState<Date>(new Date(data.deadline));
    
    const onSubmit = async () => {
        const activationTime = activationDate.getTime();
        const deadlineTime = deadline.getTime();

        if (activationDate >= deadline) {
            toast({
                title: "Error",
                description: "Activation date cannot be later than the deadline.",
                variant: "destructive"
            })
            return;
        }
        try {
            await JobUtil.update({ ...form.getValues(), activationDate: activationTime, deadline: deadlineTime }, data.id);
            toast({
                title: "Succesful",
                description: "You have updated the job!"
            })
            setOpenDialog(false);
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    defaultValue={data.title}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    defaultValue={data.description}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className='resize-none' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex gap-x-2'>
                    <FormField
                        control={form.control}
                        name="city"
                        defaultValue={data.city}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input className='w-28' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        defaultValue={data.country}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input className='w-28' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="selects-container flex gap-x-2">
                    <FormField
                        control={form.control}
                        name="eligibility"
                        defaultValue={data.eligibility}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Eligibility</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                        <SelectTrigger className='h-10 w-28'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ONSITE">On-site</SelectItem>
                                            <SelectItem value="REMOTE">Remote</SelectItem>
                                            <SelectItem value="HYBRID">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        defaultValue={data.level}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                        <SelectTrigger className='h-10 w-28'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="INTERN">Intern</SelectItem>
                                            <SelectItem value="JUNIOR">Junior</SelectItem>
                                            <SelectItem value="MID">Mid</SelectItem>
                                            <SelectItem value="SENIOR">Senior</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='mt-4 flex flex-col gap-y-2 text-sm'>
                    <div>
                        <h1>Activation Time</h1>
                        <DateTimePicker date={activationDate} setDate={setActivationDate} />
                    </div>
                    <div>
                        <h1>Deadline</h1>
                        <DateTimePicker date={deadline} setDate={setDeadline} />
                    </div>
                </div>
                <Button className='w-full mt-4' type="submit">Update</Button>
            </form>
        </Form>
    )
}
