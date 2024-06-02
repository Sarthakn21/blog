import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        return storedLoginStatus === "true";
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }, [isLoggedIn]);

    const loginUser = () => {
        setIsLoggedIn(true);
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
    };

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;