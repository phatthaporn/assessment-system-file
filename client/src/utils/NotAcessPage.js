import React from 'react'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Typography, Box, Stack } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyle = makeStyles({
    root: {
        background: "#ededed",
        minHeight: "100vh",
        width: "100%",
        overflow: 'auto'
    }
})

function PermissionPage({ msg }) {
    const classes = useStyle()

    return <>
        <Box className={classes.root}>
            <Stack mt={30} spacing={2} alignItems='center' >
                <Box mb={5}>
                    <DoNotDisturbOnIcon fontSize='large' color='error' />
                </Box>
                <Typography variant='h5'>{msg}</Typography>
            </Stack>
        </Box>
    </>
}

export default PermissionPage


