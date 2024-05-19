import React from "react";
import Link from "next/link";
import CreateTicketForm from "./components/TicketForm";

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "50px",
        }}
      >
        <h1 style={{ fontFamily: "Arial, sans-serif", margin: "0" }}>
          Welcome to the Help Desk!
        </h1>
        <Link href="/admin">
          <button
            style={{
              fontSize: "1rem",
              fontFamily: "Arial, sans-serif",
              backgroundColor: "#8fbc8f",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Admin
          </button>
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <CreateTicketForm />
      </div>
    </div>
  );
};

export default Home;
