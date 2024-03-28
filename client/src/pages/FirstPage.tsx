import React from "react";
import { Link } from "react-router-dom";
import colour from "../assets/images/colour.jpg";
import ticket from "../assets/images/ticket.jpg";
import image from "../assets/images/output.png"
import space from "../assets/images/space.jpg"
import band from "../assets/images/aband.jpg"

const FirstPage = () => {
    const throwError = () => {
        throw new Error('An error occurred after clicking on Signin.');
    };
    return (
        <div className="relative flex justify-center items-center h-screen text-white">
            <div className="container mx-auto flex flex-col items-center">
                <img src={colour} alt="Background" className="h-full object-cover absolute inset-0 w-full" />
                <div className="bg-white rounded-lg p-6 flex flex-row items-center relative">
                    <div className="text-mask text-center relative">
                        <h1 className="text-4xl font-bold mb-2" style={{ backgroundClip: "text", backgroundImage: `url(${band})`, WebkitBackgroundClip: "text", color: "transparent" }}>PlanExec</h1>
                        <p className="text-lg" style={{ backgroundClip: "text", backgroundImage: `url(${band})`, WebkitBackgroundClip: "text", color: "transparent" }}>
                            "Unlock the Fun! Plan, Join, and Revel. Experience Flexibility with Ease. PlanExec: Where Events Come to Life!"
                        </p>
                        <div className="flex mt-4">
                            <div className="mr-4">
                                <Link to="/signin" className="py-2 px-4 bg-transparent rounded-md text-black border border-black hover:bg-black hover:text-white" onClick={throwError}>Signin</Link>
                            </div>
                            <div>
                                <Link to="/signup" className="py-2 px-4 bg-transparent rounded-md text-black border border-black hover:bg-black hover:text-white">Signup</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                    <img src={ticket} alt="Ticket" className="h-auto w-48 md:w-64 lg:w-72 mt-4" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
