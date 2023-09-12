"use client"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type ApplicationContextProps = {
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}

const ApplicationContext = createContext<ApplicationContextProps | null>(null);

export default function ApplicationProvider({ children }: { children: React.ReactNode }) {

    const [update, setUpdate] = useState<boolean>(false);

    return (
        <ApplicationContext.Provider value={{update, setUpdate }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const useApplication = () => {
    const application = useContext(ApplicationContext);
    if (application !== null) {
        return application;
    }
    throw "You tried to use a hook outside of its provider!";
};
