import React from "react";
import Events from "../events";
import AccountLayout from "../../layouts/navbar";

const HomePage = () => {
    return (
        <div>
            <AccountLayout/>
            <div>
                <Events/>
            </div>
        </div>
    )
 }
 export default HomePage