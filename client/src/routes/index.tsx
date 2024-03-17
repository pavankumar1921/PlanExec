import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Logout from "../pages/logout";
import AccountLayout from "../layouts/navbar";
import ProtectedRoute from "./ProtectedRoute";
import FirstPage from "../pages/FirstPage"
import { HomeIcon } from "@heroicons/react/24/outline";

const router = createBrowserRouter([
    {
        path:"/",
        element: <FirstPage/>
    },
    {
        path:"/homepage",
        element: <HomePage/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/signin",
        element:<Signin/>
    },
    {
        path:"/logout",
        element:<Logout/>
    },
    {
        path: "navbar",
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
      },
])

export default router