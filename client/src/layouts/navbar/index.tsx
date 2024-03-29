import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import React from "react";

const AccountLayout = () => {
  return (
    <>
      <div className="bg-teal-600 rounded-lg">
        <Appbar />
      </div>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default AccountLayout;