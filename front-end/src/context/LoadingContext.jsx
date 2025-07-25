import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [spinnerLoading, setSpinnerLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{spinnerLoading, setSpinnerLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};