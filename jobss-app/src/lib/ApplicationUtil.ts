import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "./utils";
import { Application } from "models";
export class ApplicationUtil {

    static async getApplicationsByPost(post_id: number){
        let applications: Application[] = []
        try {
            let res: AxiosResponse = await axios.get(`${SERVER_URL}/api/v1/applications/?post_id=${post_id}`);
            applications = res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log("Error at fetching applications!");
            }
        } finally {
            return applications;
        }
    }

    static async getApplicationsByUser(user_id: number) {
        let applications: Application[] = []
        try {
            let res: AxiosResponse = await axios.get(`${SERVER_URL}/api/v1/applications/?user_id=${user_id}`);
            applications = res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log("Error at fetching applications!");
            }
        } finally {
            return applications;
        }
    }


    static async delete(id: number) {
        try {
            let res: AxiosResponse = await axios.delete(`${SERVER_URL}/api/v1/applications/${id}`);
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log("Error at deleting the application!");
            }
        }
    }

    static async apply(data: any, user_id: number | undefined, post_id: number) {
        try {
            let res: AxiosResponse = await axios.post(`${SERVER_URL}/api/v1/applications/`, {
                user_id,
                post_id,
                ...data
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409){
                    throw Error("You are in the blacklist!");
                } else {
                    throw Error("Something went wrong!");
                }
                
            }
        }
    }

    static async update(data: any, id: number) {
        try {
            let res: AxiosResponse = await axios.put(`${SERVER_URL}/api/v1/applications/${id}`, data);
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw Error("You couldn't update your application!");
            }
        }
    }

    static async verify(id : number) {
        try {
            let res: AxiosResponse = await axios.put(`${SERVER_URL}/api/v1/applications/${id}`, {
                status: "VERIFIED"
            });
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw Error("Error: Status couldn't be updated!");
            }
        }
    }

    static async reject(id : number) {
        try {
            let res: AxiosResponse = await axios.put(`${SERVER_URL}/api/v1/applications/${id}`, {
                status : "REJECTED"
            });
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw Error("Error: Status couldn't be updated!");
            }
        }
    }

    static async deleteApplicationsByUser(user_id: number) {
        try {
            let res: AxiosResponse = await axios.delete(`${SERVER_URL}/api/v1/applications/users/${user_id}`);
            return res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw Error("Error: Applications couldn't be deleted!");
            }
        }

    }
}