import React from "react";
import TicketList from "../components/TicketList";
import Link from "next/link";

const Page: React.FC = () => {
  return (
    <div>
      <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
        <Link href="/">
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
            Create a Ticket
          </button>
        </Link>
      </div>
      <div style={{ marginTop: "30px" }}>
        <TicketList />
      </div>
    </div>
  );
};

export default Page;
