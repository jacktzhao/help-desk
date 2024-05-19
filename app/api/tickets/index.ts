import { Ticket } from "../../types/ticket";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";

export const addTicket = async (ticket: Ticket) => {
  try {
    await addDoc(collection(db, "tickets"), {
      name: ticket.name,
      email: ticket.email,
      description: ticket.description,
      status: ticket.status,
      createdAt: ticket.createdAt,
    });
  } catch (e) {
    console.error("Error adding ticket: ", e);
  }
};

export const getAllTickets = (
  callback: (tickets: Ticket[]) => void
): (() => void) => {
  const tickets = collection(db, "tickets");

  const unsubscribe = onSnapshot(
    tickets,
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const tickets: Ticket[] = [];
      querySnapshot.forEach((doc) => {
        const ticket: Ticket = {
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          description: doc.data().description,
          status: doc.data().status,
          createdAt: doc.data().createdAt,
        };
        tickets.push(ticket);
      });
      callback(tickets);
    },
    (error) => {
      console.error("Error getting tickets:", error);
    }
  );

  return unsubscribe;
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
