import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import CompletedTasks from "../pages/CompletedTasks/CompletedTasks";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyTasks from "../pages/MyTasks/MyTasks";
import Signup from "../pages/Signup/Signup";
import TaskDetails from "../pages/TaskDetails/TaskDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/mytasks',
                element: <PrivateRoute><MyTasks /></PrivateRoute>
            },
            {
                path: '/completed',
                element: <PrivateRoute><CompletedTasks /></PrivateRoute>
            },
            {
                path: '/mytasks/:id',
                element: <PrivateRoute><TaskDetails /></PrivateRoute>,
                loader: ({params}) => fetch(`https://task-management-henna.vercel.app/tasks/${params.id}`)
            }
        ]
    }
])