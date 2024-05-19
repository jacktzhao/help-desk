"use client";

import React, { useState } from "react";
import { Ticket } from "../types/ticket";
import { addTicket } from "../api/tickets";
import styles from "../styles/CreateTicketForm.module.css";

const CreateTicketForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const ticket: Ticket = {
      name,
      email,
      description,
      status: "new",
    };

    try {
      await addTicket(ticket);
      console.log("Ticket successfully added");

      setSubmitted(true);
      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <p>Thank you for submitting the ticket!</p>
          <button className={styles.button} onClick={handleReset}>
            Submit Another Ticket
          </button>
        </div>
      ) : (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Name:
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email:
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description:
              <textarea
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <button className={styles.button} type="submit">
            Create Ticket
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTicketForm;
