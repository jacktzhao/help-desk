"use client";

import React, { useEffect, useState } from "react";
import { Ticket } from "../types/ticket";
import { getAllTickets } from "../api/tickets";
import styles from "../styles/TicketList.module.css";
import TicketModal from "./TicketResponseModal";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const unsubscribe = getAllTickets((fetchedTickets: Ticket[]) => {
      setTickets(fetchedTickets);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const getStatusLabelClass = (status: string) => {
    switch (status) {
      case "new":
        return styles.newStatus;
      case "in-progress":
        return styles.inProgressStatus;
      case "resolved":
        return styles.resolvedStatus;
      default:
        return "";
    }
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className={styles.ticketListContainer}>
      <table className={styles.ticketTable}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} onClick={() => handleTicketClick(ticket)}>
              <td
                className={`${styles.statusLabel} ${getStatusLabelClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </td>
              <td>{ticket.name}</td>
              <td>{ticket.email}</td>
              <td>{truncateDescription(ticket.description, 45)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default TicketList;
