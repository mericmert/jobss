import { ApplicationUtil } from '@/lib/ApplicationUtil'
import { Application } from 'models';
import React, { useEffect, useState } from 'react'

import { Separator } from './ui/separator';
import Applicant from './Applicant';
import { ClipLoader } from 'react-spinners';

export default function ApplicantsList({ post_id }: { post_id: number }) {

  const [applicants, setApplicants] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchApplications = async () => {
    let data: Application[] = await ApplicationUtil.getApplicationsByPost(post_id);
    setApplicants(data);
  }

  useEffect(() => {
    fetchApplications();
    setTimeout(() => setIsLoading(false), 300);
  }, [])

  return (
    <div className='max-h-[450px] overflow-auto flex flex-col gap-y-1' >
      <h1>Applicants:</h1>
      <Separator />
      {isLoading ?
        <div className='w-full flex justify-center'>
          <ClipLoader color="#10172A" />
        </div>
        :
        applicants.map((applicant: Application, idx: number) => <Applicant key={idx} data={applicant} />)}
    </div>
  )
}
