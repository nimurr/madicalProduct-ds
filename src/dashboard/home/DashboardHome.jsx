import React from "react";
import Card from "./Card";
import Barchart from "./Barchart";
import Transaction from "./Transaction";
import Users from "../menu/Users";

const DashboardHome = () => {

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("users", users?.user);
  const userRole = users?.user?.role;

  return (
    <div>
      <Card> </Card>
      {/* <Barchart /> */}
      {
        userRole === "masterAdmin" && (
          <Transaction />
        )
      }
      {
        userRole !== "masterAdmin" && (
          <Users />
        )
      }
    </div>
  );
};

export default DashboardHome;
