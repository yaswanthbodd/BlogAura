import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [mode, setMode] = useState('dark');

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const theme = useMemo(()=> createTheme({
        palette : {
            mode,
            ...(mode === 'light' 
                ? {
                    background : {
                        default : '#f0f0f0',
                    },
                }
                :{
                    background : {
                        default : '#121212',
                        paper : '#1e1e1e',
                    }
                }
        )}
    }), [mode]);

    return(
        <ColorModeContext.Provider value={{toggleColorMode,mode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ThemeContextProvider;