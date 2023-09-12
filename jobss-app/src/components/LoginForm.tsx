"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { SERVER_URL } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import axios, { AxiosError, AxiosResponse } from "axios";
import { setItem } from "@/lib/storage";
import { useToast } from "./ui/use-toast";
import { useSession } from "@/contexts/AuthProvider";
import jwtDecode from "jwt-decode";
import { User } from "models";

export default function LoginForm() {
    const [tab, setTab] = useState<number>(0);


    return (
        <div className="h-full w-full bg-background shadow-md shadow-input">
            <FormTab value={0} current={tab}>
                <UserLoginForm setTab={setTab} />
            </FormTab>
            <FormTab value={1} current={tab}>
                <HrLoginForm setTab={setTab} />
            </FormTab>
        </div>
    )
}

const UserLoginForm = ({ setTab }: { setTab: Dispatch<SetStateAction<number>> }) => {

    const router = useRouter();

    const signInWithLinkedin = async (): Promise<void> => {
        router.replace(`${SERVER_URL}/api/v1/users/auth/oauth-code`);
    }

    return (
        <div className="w-full min-h-[320px] h-full flex flex-col items-center justify-between p-3 gap-y-6">
            <div className="w-full flex flex-col items-center">
                <h1 className="font-semibold text-lg text-center text-foreground">Discover Countless Job Opportunities!</h1>
                <Separator className="mt-4" />
            </div>

            <Button onClick={() => signInWithLinkedin()} className="h-12 w-64 bg-[#0472B3] hover:bg-[#0472B3] text-white flex justify-between pr-12">
                <Image
                    src={"/linkedin-logo.png"}
                    alt="linkedin logo"
                    width={32}
                    height={32}
                />
                Sign in with Linkedin
            </Button>
            <button onClick={() => setTab(1)} className="text-sm text-primary/60">Are you a HR expert at OBSS?</button>
        </div>
    )
}

const HrLoginForm = ({ setTab }: { setTab: Dispatch<SetStateAction<number>> }) => {

    const form = useForm();
    const { toast } = useToast();
    const router = useRouter();
    const { setData } = useSession();

    const onSubmit = async () => {
        try {
            let res: AxiosResponse = await axios.post(`${SERVER_URL}/api/v1/users/auth/login`, form.getValues());
            setItem("session-refresh", res.data.refreshToken);
            setItem("user-session", res.data.accessToken, true);
            const user_data: User = jwtDecode(res.data.accessToken);
            setData(user_data);
            router.replace("/");

        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err);
                if (err.response?.status === 401) {
                    toast({
                        title: "Error",
                        description: "Invalid Credentials!",
                        variant: "destructive"
                    })
                }
            }
        }

    }
    return (
        <div className="p-3 flex flex-col gap-y-4">
            <div>
                <h1 className="font-semibold text-lg text-center text-foreground">Sign into HR Management System</h1>
                <Separator className="mt-4" />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center gap-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-3/4">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" required className="rounded-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-3/4">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" required type="password" className="rounded-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-3/4 bg-sky-700 hover:bg-sky-900 text-white" type="submit">Log in</Button>
                </form>
            </Form>

            <button onClick={() => setTab(0)} className="text-sm text-primary/60">Are you an applicant?</button>
        </div>
    )
}


const FormTab = ({ children, value, current }: { children: React.ReactNode, value: number, current: number }) => {
    if (value === current) {
        return (
            <>
                {children}
            </>
        );

    }
    return;
}