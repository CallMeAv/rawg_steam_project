import { createContext, useState, useEffect, useContext } from "react";



const DarkmodeContext = createContext();

export const useDarkmodeContext = () => {
    const context = useContext(DarkmodeContext);
    return context;
}

export const DarkmodeProvider = ({ children }) => {
    const [isDarkmode, setIsDarkmode] = useState(() => {
        const storedValue = localStorage.getItem("isDarkmode");
        return storedValue ? JSON.parse(storedValue) : true;
    });

    const handleToggleDarkmode = () => {
        setIsDarkmode(prevState => {
            const newValue = !prevState; 
            localStorage.setItem("isDarkmode", JSON.stringify(newValue));
            return newValue;

        });
    }

    useEffect(() => {
        document.documentElement.dataset.bsTheme = isDarkmode ? "dark" : "";
    }, [isDarkmode]);

    return (
        <DarkmodeContext.Provider value={{ isDarkmode, handleToggleDarkmode }}>
            {children}
        </DarkmodeContext.Provider>
    )
}
