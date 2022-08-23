import { Box, Grid, Button } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Faculty from "../components/organization/faculty"
import FacultyMajor from '../components/organization/faculty-major';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function Organization() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#af705e"}}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="จัดการคณะ" {...a11yProps(0)} />
                    <Tab label="จัดการสาขา" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Faculty />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FacultyMajor />
            </TabPanel>
        </Box >
    )
}

export default Organization
