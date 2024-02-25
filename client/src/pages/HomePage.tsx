import React from "react";
import Events from "./events/Events";
import CreateEvent from "./events/CreateEvent";

const HomePage = () => {
    return (
        <div >
            <h1>This is my landing Page</h1>
            <CreateEvent/>
            <Events/>
        </div>
    )
 }
 export default HomePage