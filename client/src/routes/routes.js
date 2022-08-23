import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../Layout';
import NotAccessPage from '../utils/NotAcessPage';
import Loadable from '../utils/Loadable';

const Home = Loadable(lazy(() => import("../pages/Home")))
const Login = Loadable(lazy(() => import("../pages/Login")))
const Register = Loadable(lazy(() => import("../pages/Register")))
const Password = Loadable(lazy(() => import("../pages/Password")))
const Organization = Loadable(lazy(() => import("../pages/Organization")))
const Assessment = Loadable(lazy(() => import("../pages/Assessments")))
const AssessmentAll = Loadable(lazy(() => import("../pages/Assessment-all")))
const CreateAssessment = Loadable(lazy(() => import("../pages/Assessment-setup")))
const Approve = Loadable(lazy(() => import("../pages/Approve")))
const Report = Loadable(lazy(() => import("../pages/Report")))

const getPathFormRole = (roleId) => {
    switch(roleId) {
        case "fbb84c66-5916-45bb-bc70-d1785fa5d14c":
            return [
                {
                    path: '/',
                    element: <Navigate to="/home" />
                },
                {
                    path: '/home',
                    element: <Home roleId={roleId} />,
                },
                {
                    path: '/assessment',
                    element: <AssessmentAll roleId={roleId} />
                },
                { path: '/assessment/:id', element: <Assessment />},
                {
                    path: '/assessment-setup',
                    element: <CreateAssessment />
                },
                {
                    path: '/report',
                    element: <Report />,
                },
                {
                    path: '/organization',
                    element: <Organization />,
                },
                {
                    path: '/approve',
                    element: <Approve />,
                },
                {
                    path: "/password",
                    element: <Password />
                },
                {
                    path: "*",
                    element: (
                        <NotAccessPage msg="ไม่พบหน้าที่คุณค้นหา" />
                    ),
                }
            ]
        case "23e5eba9-ead3-40d4-a1eb-daf08165a788":
            return [
                {
                    path: '/',
                    element: <Navigate to="/home" />
                },
                {
                    path: '/home',
                    element: <Home roleId={roleId} />,
                },
                {
                    path: '/assessment',
                    element: <AssessmentAll roleId={roleId} />
                },
                { path: '/assessment/:id', element: <Assessment />},
                {
                    path: '/assessment-setup',
                    element: <CreateAssessment />
                },
                {
                    path: '/report',
                    element: <Report />,
                },
                {
                    path: "/password",
                    element: <Password />
                },
                {
                    path: "*",
                    element: (
                        <NotAccessPage msg="ไม่พบหน้าที่คุณค้นหา" />
                    ),
                }
            ]
    }
}

const Routes = () => {
    let isLoggedIn = true
    if (!(localStorage.getItem("TOKEN") && localStorage.getItem("Authenticated"))) {
        isLoggedIn = false
    }

    const profile = JSON.parse(localStorage.getItem("USER_PROFILE"));
    const children = getPathFormRole(profile?.roleId);

    // console.log(window.location.pathname.split("/assessment")[1] === undefined)

    return [
        {
            path: '/',
            element: isLoggedIn ? 
            window.location.pathname.split('/')[1] === "assessment" && window.location.pathname.split('/')[2] !== undefined ? <Outlet /> : <Layout roleId={profile?.roleId} />
             : <Navigate to="/login" />,
             children
        },
        {
            path: '/',
            element: !isLoggedIn ? <Outlet /> : <Navigate to="/" />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register />},
                { path: '/', element: <Navigate to="/login" /> },
                { path: '/assessment/:id', element: <Assessment />}
            ],
        },
    ]
};

export default Routes;

