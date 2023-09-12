"use client"
import React from 'react'
import JobCard from './JobCard'
import { Post } from 'models';
import {SyncLoader} from 'react-spinners';
import { useJobs } from '@/contexts/JobProvider';
export default function JobContent({isLoading }: {isLoading: boolean }) {
    const {posts} = useJobs(); 
    return (
        <div className="job-container m-auto w-3/4 md:w-2/3 flex flex-col gap-y-6">
            {isLoading ?
                <div className='w-full h-[calc(100vh-86px)] flex justify-center items-center'>
                    <SyncLoader color='#0084C7' />
                </div> :
                <>
                    {posts.map((post: Post) => (<JobCard key={post.id} data={post} />))}
                </>
            }
        </div>
    )
}
