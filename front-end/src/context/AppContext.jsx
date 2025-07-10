import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const checkAuth = async () => {
            try {
            console.log("Checking authentication status...");
            const res = await axios.get('http://localhost:8080/validate', { withCredentials: true });
            console.log("Validate response data:", res.data);
            setUserData(res.data);
            if (res.status === 200 && res.data?.authenticated === true) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            } catch (err) {
            console.error("Auth check failed:", err);
            setIsAuthenticated(false);
            } finally {
            setLoading(false);
            }
        };

        checkAuth();
        }, []);

    const spinner = () => {
        if (loading) {
            return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
                flexDirection="column"
                gap={2}
            >
                <CircularProgress size={40} />
                <Typography variant="h6">Please Wait...</Typography>
            </Box>
            );
        }
    }
    
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading,userData }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default ContextProvider;