import { Suspense } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Loadable = (Component) => (props) =>
(
    <Suspense fallback={
        <Backdrop
            sx={{ color: '#fff', zIndex: 99999 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>}
    >
        <Component {...props} />
    </Suspense>
);

export default Loadable;
