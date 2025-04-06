import { ContactCollection } from "../db/models/Contact.js";

export const getAllContacts = (userId) => ContactCollection.find({ userId });

export const createContact = (userData, userId) =>
  ContactCollection.create({ userId, ...userData });
