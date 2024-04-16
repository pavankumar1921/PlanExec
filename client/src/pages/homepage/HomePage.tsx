import React from "react";
import Events from "../events";
import AccountLayout from "../../layouts/navbar";
import Services from "../services";

const HomePage = () => {
    return (
        <div>
            <AccountLayout/>
            <div className="grid grid-rows-auto grid-cols-6 grid-flow-col">
                <div className="col-start-1 col-span-4">
                Upcoming event
                <div >
                    No upcoming events
                </div>
                </div>
                <div className=" col-span-4 col-start-1 rounded-lg border-mg">
                    <Events/>
                </div>
                <div className="col-start-5 col-span-2">
                    <Services/>
                </div>
            </div>
            
        </div>
    )
 }
 export default HomePage