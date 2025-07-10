import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
    const [bearerToken, setBearerToken] = useState('');


    return(
        <AppContext.Provider value={{bearerToken,setBearerToken}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider;