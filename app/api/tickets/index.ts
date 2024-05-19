import { Ticket } from "../../types/ticket";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const addTicket = async (ticket: Ticket) => {
  try {
    await addDoc(collection(db, "tickets"), {
      name: ticket.name,
      email: ticket.email,
      description: ticket.description,
      status: ticket.status,
    });
  } catch (e) {
    console.error("Error adding ticket: ", e);
  }
};

export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    const ticketsCollection = collection(db, "tickets");
    const querySnapshot = await getDocs(ticketsCollection);
    const tickets: Ticket[] = [];

    querySnapshot.forEach((doc) => {
      const ticket: Ticket = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        description: doc.data().description,
        status: doc.data().status,
      };
      tickets.push(ticket);
    });

    return tickets;
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    throw error;
  }
};

export const editStatus = async (
  ticketId: string,
  newStatus: string
): Promise<void> => {
  try {
    const ticketRef = doc(db, "tickets", ticketId);

    const ticketSnapshot = await getDoc(ticketRef);

    if (ticketSnapshot.exists()) {
      await updateDoc(ticketRef, {
        status: newStatus,
      });
    } else {
      throw new Error("Ticket not found");
    }
  } catch (error) {
    console.error("Error editing ticket status:", error);
    throw error;
  }
};
