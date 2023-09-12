"use client"
import LoadingPage from '@/components/LoadingPage';
import LoginForm from '@/components/LoginForm'
import { useSession } from '@/contexts/AuthProvider'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function LoginPage() {

    const {data : session, isLoading, isAuthenticated} = useSession();
    const router = useRouter();

    if (isLoading){
        return <LoadingPage/>
    }
    if (isAuthenticated) {
        router.replace("/");
        return;
    }

    return (
        <main className='flex flex-col items-center min-h-[calc(100vh-56px)]'>
            <div className="fixed z-0 -top-[300px] bottom-0 left-0 right-0 -skew-y-[12deg] w-full h-full bg-primary-foreground origin-[0]">
                <div className="z-10 absolute stripe h-10 bg-sky-600 opacity-70 bottom-0 left-[0] right-[calc(50%+460px)]" />
                <div className="z-10 absolute stripe h-10 bg-sky-900 opacity-70 bottom-8 left-[calc(50%-650px)] right-[calc(50%+540px)]" />
                <div className="z-10 absolute stripe h-10 bg-sky-900 opacity-70 -bottom-8 left-[calc(50%+360px)] right-0" />
                <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-input left-[calc(50%-540px)]" />
                <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-input left-[calc(50%+192px)] sm:left-[calc(50%+240px)]" />
                <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-input left-[calc(50%-193px)] sm:left-[calc(50%-241px)]" />
                <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-input left-[calc(50%+541px)]"></div>
                <div className="vertical-line absolute w-[1px] top-0 bottom-0 right-auto bg-input left-[calc(50%)]"></div>
            </div>
            <div className="form-container z-10 mt-[20vh] min-h-[320px] w-[384px] sm:w-[480px]">
                <LoginForm />
            </div>
        </main>
    )
}
