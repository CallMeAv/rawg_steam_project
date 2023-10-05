import { createContext, useContext, useEffect, useState } from "react";

const baseUrl = "https://api.rawg.io/api";
const key = "4519bc8b96b94de5a7979ad661d4c5bd";

const DevsContext = createContext();

export const useDevs = () => {
    const context = useContext(DevsContext);
    return context;
}

const getDevs = async () => {
    const result = await fetch(`${baseUrl}/developers?key=${key}`, {
        method: "Get",
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    })

    return await result.json();
}
export const DevsProvider = ({ children }) => {
    const [devs, setDevs] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setDevs(await getDevs());
        }
        fetchData();
    }, []);

    return ( 
        <DevsContext.Provider value={{devs}}>
        {children}
        </DevsContext.Provider> 
    )
}

 