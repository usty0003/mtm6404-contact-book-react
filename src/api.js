import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./db";

export const fetchContacts = async () => {
  try {
    const contactsRef = collection(db, "contacts", "M5mPfO1B4TFW76aAHWHE", "contacts");
    const querySnapshot = await getDocs(contactsRef);
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const fetchContact = async (id) => {
  try {
    const contactRef = doc(db, "contacts", "M5mPfO1B4TFW76aAHWHE", "contacts", id);
    const docSnap = await getDoc(contactRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such contact!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
};

export const addContact = async (newContact) => {
  try {
    const contactsRef = collection(db, "contacts", "M5mPfO1B4TFW76aAHWHE", "contacts");
    const docRef = await addDoc(contactsRef, newContact);
    return docRef;
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const contactRef = doc(db, "contacts", "M5mPfO1B4TFW76aAHWHE", "contacts", contactId);
    await updateDoc(contactRef, updatedData);
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

export const deleteContact = async (contactId) => {
  try {
    const contactRef = doc(db, "contacts", "M5mPfO1B4TFW76aAHWHE", "contacts", contactId);
    await deleteDoc(contactRef);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};