"use client"
import ApplicationCard from "@/components/ApplicationCard";
import { Separator } from "@/components/ui/separator";
import { useApplication } from "@/contexts/ApplicationProvider";
import { useSession } from "@/contexts/AuthProvider";
import { ApplicationUtil } from "@/lib/ApplicationUtil";
import { Application } from "models";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const [applications, setApplications] = useState<Application[]>([]);
    const { data: session, isLoading, isAuthenticated } = useSession();
    const {update} = useApplication();
    const router = useRouter();
    const fetchApplications = async () => {
        if (session) {
            let data: Application[] = await ApplicationUtil.getApplicationsByUser(session.id);
            setApplications(data);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [session, update]);

    if (isLoading) {
        return;
    }
    if (!isAuthenticated) {
        router.replace("/login");
        return;
    }
    if (session && session.role === "HR"){
        router.replace("/");
        return;
    }
    
    return (
        <main className="w-3/4 m-auto pt-6 ">
            <h1 className="text-xl">My Applications</h1>
            <Separator className="bg-primary/30 my-3" />
            <div className="application-container flex flex-wrap gap-x-4 gap-y-4 max-h-[515px] overflow-auto p-6">
                {applications.map((application: Application, idx: number) => (
                    
                    <ApplicationCard data={application} setApplications={setApplications} key={idx} />
                ))}

            </div>
        </main>
    )
}
