import React, { useState } from "react";
import { Ticket } from "../types/ticket";
import styles from "../styles/TicketResponseModal.module.css";
import { editStatus } from "../api/tickets";

interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newStatus, setNewStatus] = useState(ticket.status);
  const [response, setResponse] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleResponseChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setResponse(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (response) {
        console.log(
          "Would normally send email to",
          ticket.email,
          "with reply:",
          response
        );
      }
      if (ticket.id !== undefined) {
        await editStatus(ticket.id, newStatus);
        handleClose();
      } else {
        console.error("Ticket ID is undefined");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <p>
            <b>Status:</b>{" "}
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as Ticket["status"])}
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </p>
          <p>
            <b>Name:</b> {ticket.name}
          </p>
          <p>
            <b>Email:</b> {ticket.email}
          </p>
          <p>
            <b>Description:</b> {ticket.description}
          </p>
          <textarea
            placeholder="Enter your response"
            value={response}
            onChange={handleResponseChange}
            rows={4}
            cols={40}
            style={{ marginTop: "10px" }}
          />
          <br></br>
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default TicketModal;
