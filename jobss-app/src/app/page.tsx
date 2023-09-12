"use client"
import JobContent from "@/components/JobContent";
import JobFilter from "@/components/JobFilter";
import { JobUtil } from "@/lib/JobUtil";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";
import JobProvider, { Query, useJobs } from "@/contexts/JobProvider";

const PAGINATION_SIZE = 3;


const processQuery = (query: Query): string => {
  let res: string = "";
  Object.entries(query).forEach(([key, value]) => {
    if (value && value.length !== 0) {
      res += `${key}=${value}&`
    }
  })
  return res;
}

function Home() {


  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const searchTimeout = useRef<any>(null);
  const { query, setPosts, dataCounts, setDataCounts } = useJobs();

  let abortController = new AbortController();

  const fetchPosts = async (query: string) => {
    setIsLoading(true);
    clearTimeout(searchTimeout.current);

    abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    searchTimeout.current = setTimeout(async () => {
      try {
        let { postList, totalCount, totalPages } = query ?
          await JobUtil.getPosts(signal, page, PAGINATION_SIZE, query) :
          await JobUtil.getPosts(signal, page, PAGINATION_SIZE);

        setPosts(postList);
        setDataCounts({ totalCount, totalPages });
      } catch (err) {
        console.log("ERROR: fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);
  }

  useEffect(() => {
    let q: string = processQuery(query);
    fetchPosts(q);

  }, [query, page]);


  return (
    <main>
      <JobFilter />
      <div className="md:ml-[288px] md:w-[calc(100%-288px) py-8">
        <div className=" m-auto w-3/4 md:w-2/3">
          <h1 className="text-lg">{dataCounts.totalCount} Results Found:</h1>
        </div>
        <JobContent isLoading={isLoading} />
        <div className="mt-8 w-full flex justify-end pr-16">
          <div className="text-sm">
            <span>
              {(PAGINATION_SIZE * page + 1)}-{Math.max(PAGINATION_SIZE * page + 1, Math.min((PAGINATION_SIZE * page) + PAGINATION_SIZE, dataCounts.totalCount))} of {dataCounts.totalCount}
            </span>
            <IconButton onClick={() => setPage(prev => prev - 1)} disabled={page === 0 || dataCounts.totalCount === 0} className="text-primary">
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setPage(prev => prev + 1)} disabled={page === dataCounts.totalPages - 1 || dataCounts.totalCount === 0} className="text-primary">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>

    </main>
  )
}

export default function Homepage() {
  return (
    <JobProvider>
      <Home />
    </JobProvider>
  )
}