import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "models";
import { SERVER_URL } from "./utils";


export class UserUtil {

    static async getUsers() {
        let users: User[] = []
        try {
            let res: AxiosResponse = await axios.get(`${SERVER_URL}/api/v1/users/`);
            users = res.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log("Error at fetching applications!");
            }
        } finally {
            return users;
        }
    }

    static async blacklist(id: number, addBlacklist: boolean) {
        try {
            let res: AxiosResponse = await axios.post(`${SERVER_URL}/api/v1/users/blacklist`, { id, blacklisted : addBlacklist});
            return res.data
        } catch (err) {
            if (err instanceof AxiosError) {
                console.log("Error at fetching applications!");
            }
        }
    }
}