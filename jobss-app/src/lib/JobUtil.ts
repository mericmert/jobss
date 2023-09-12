import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "./utils";

export class JobUtil {


    static async getPosts(
        signal: AbortSignal,
        page: number | null = null,
        size: number | null = null,
        query: string = "") {
        try {
            let res: AxiosResponse;
            if (page !== null && size !== null) {
                res = await axios.get(`${SERVER_URL}/api/v1/jobs/posts/?page=${page}&size=${size}&${query}`, { signal });
            } else {
                res = await axios.get(`${SERVER_URL}/api/v1/jobs/posts/?${query}`, { signal });
            }
            return res.data;

        } catch (err) {
            if (err instanceof AxiosError) {
                console.log(err.message);
            }
        }

    }

    static async create(data: any) {
        try {
            let res: AxiosResponse = await axios.post(`${SERVER_URL}/api/v1/jobs/posts/`, JSON.stringify(data), {
                headers: {"Content-Type" : "application/json"}
            });
            return res.data;
        } catch (err) {
            console.log(err);
            if (err instanceof AxiosError) {
                throw new Error("Post couln't be created!");
            }
        }
    }

    static async delete(id: number) {
        try {
            let res: AxiosResponse = await axios.delete(`${SERVER_URL}/api/v1/jobs/posts/${id}`);
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error("Post couln't be deleted!");
            }
        }
    }


    static async update(data: any, id: number) {
        try {
            let res: AxiosResponse = await axios.put(`${SERVER_URL}/api/v1/jobs/posts/${id}`, data);
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw Error("You couldn't update the post!");
            }
        }
    }
}