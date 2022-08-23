
import axios from "axios";
import { useRef } from 'react';
import LoadingModal from './utils/LoadingModal';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import Theme from "./utils/Theme";
import Routes from './routes';
import SnackbarRef from './utils/SnackbarRef'

function App() {
    const loadingModalRef = useRef(null);
    const snackbarRef = useRef(null);

    axios.interceptors.request.use(
        function (config) {
            loadingModalRef.current.setOpen(true)
            config.headers = { Authorization: "Bearer " + localStorage.getItem("TOKEN") }
            return config;
        },
        function (error) {
            loadingModalRef.current.setOpen(false)
            snackbarRef.current.setSnackValue({ status: true, type: 'error', message: error.toString() })
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            loadingModalRef.current.setOpen(false)
            return response;
        },
        async function (error) {
            loadingModalRef.current.setOpen(false)
            snackbarRef.current.setSnackValue({ status: true, type: 'error', message: error.toString() })
            if (error.response.status === 401 || error.response.statusText === "Unauthorized") {
                localStorage.clear();
                window.location.href = "/";
                alert('Session Timeout.');
            }
            return Promise.reject(error);
        }
    );

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={Theme}>
                    <Routes />
                    <LoadingModal ref={loadingModalRef} />
                    <SnackbarRef ref={snackbarRef} />
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
}

export default App;
