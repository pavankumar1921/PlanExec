import React from "react";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import "./i18n"

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App