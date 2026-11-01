import React, { useEffect, useState } from 'react'
import "./Body.css";
import Browse from '../Browse/Browse';
import Login from "../Login/Login"
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { auth } from "../../utils/firebase";
import { addUser, removeUser } from '../../redux/userSlice';
import WatchPlayer from '../WatchPlayer/WatchPlayer';

// Listens to Firebase once for every route, so protected pages
// (browse and watch) redirect to login and logged in users skip it.
const AuthLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                if (window.location.pathname === "/") navigate("/browse");
            } else {
                dispatch(removeUser());
                if (window.location.pathname !== "/") navigate("/");
            }
            setAuthReady(true);
        });

        return () => unsubscribe();
    }, [dispatch, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!authReady) {
        return <div className='app-loader'><div className='spinner'></div></div>;
    }

    return <Outlet />;
}

const appRouter = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/browse",
                element: <Browse />,
            },
            {
                path: "/watch/:movieId",
                element: <WatchPlayer />
            }
        ]
    }
]);

const Body = () => {
    return (<RouterProvider router={appRouter} />)
}
export default Body;
