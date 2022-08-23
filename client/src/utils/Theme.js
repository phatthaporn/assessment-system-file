import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        primary: {
            main: "#10254a",
            light: "#10254a",
        },
        info: {
            main: "#416393",
            dark: "#073965",
            contrastText: "#fff"
        },
        success: {
            main: "#6fbf73",
            dark: "#3e8e46",
            contrastText: "#fff"
        },
        warning: {
            main: "#ffa000",
            dark: "#c67100",
            contrastText: "#fff"
        },
        danger: {
            main: "#D9534F",
            dark: "#a21e27",
            contrastText: "#fff"
        },
        rmuti: {
            main: "#982d07",
            contrastText: "#fff"
        }
    },
    typography: {
        fontFamily: 'Kanit, sans-serif'
    }
});

export default Theme