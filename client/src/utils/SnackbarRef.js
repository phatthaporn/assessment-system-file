import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            setSnackValue: setSnackValue
        }
    })

    const [snackValue, setSnackValue] = useState({
        status: false,
        type: '',
        message: ''
    })

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackValue({
            ...snackValue,
            'status': false
        })
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={snackValue.status} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackValue.type} sx={{ width: '100%' }}>
                    {snackValue.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
})

export default CustomizedSnackbars