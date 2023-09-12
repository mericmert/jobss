"use client"

import { getItem } from '@/lib/storage';
import React, { createContext, useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import { User } from 'models';

type AuthContextProps = {
    data : User | null;
    isLoading : boolean;
    isAuthenticated : boolean;
    setData : React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [data, setData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const loadUser = async () => {
            const session_id : string | undefined = getItem("user-session", true);
            if (session_id) {
                const user_data : User = jwt_decode(session_id);
                setData(user_data);
            }
        }
        loadUser();
        setIsLoading(false);
    }, []);


    return (
        <AuthContext.Provider value={{data, isLoading, isAuthenticated : !!data, setData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useSession = () => {
    const session = useContext(AuthContext);
    if (session) {
        return session;
    }
    throw "No session found!";
}