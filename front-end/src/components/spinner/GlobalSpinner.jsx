import { useLoading } from "../../context/LoadingContext";
import { CircularProgress, Box } from "@mui/material";

const GlobalSpinner = () => {
    const { spinnerLoading } = useLoading();

    if (!spinnerLoading) return null;

    return (
        <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(0,0,0,0.2)"
        zIndex={2000}
        >
        <CircularProgress />
        </Box>
    );
};

export default GlobalSpinner;
