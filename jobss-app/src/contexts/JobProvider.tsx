"use client"
import { Post } from "models";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type JobContextProps = {
    posts: Post[];
    setPosts: Dispatch<SetStateAction<Post[]>>;
    query: Query;
    setQuery: Dispatch<SetStateAction<Query>>;
    dataCounts : {
        totalCount: number;
        totalPages: number;
    };
    setDataCounts : Dispatch<SetStateAction<{
        totalCount: number;
        totalPages: number;
    }>>;
}

const JobContext = createContext<JobContextProps | null>(null);

export type Query = {
    location: string;
    eligibility: string;
    level: String[];
    sortBy: string;
}


export default function JobProvider({ children }: { children: React.ReactNode }) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [query, setQuery] = useState<Query>({
        location: "",
        eligibility: "",
        level: [],
        sortBy: "",
    })

    const [dataCounts, setDataCounts] = useState({
        totalCount: 0,
        totalPages: 0
    });

    return (
        <JobContext.Provider value={{ posts, setPosts, query, setQuery, dataCounts, setDataCounts}}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobs = () => {
    const job = useContext(JobContext);
    if (job !== null) {
        return job;
    }
    throw "You tried to use a hook outside of its provider!";
};
