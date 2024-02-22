import React from "react";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App