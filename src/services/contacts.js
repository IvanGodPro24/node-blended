import { ContactCollection } from "../db/models/Contact.js";

export const getAllContacts = (userId) => ContactCollection.find({ userId });

export const createContact = (userData, userId) =>
  ContactCollection.create({ userId, ...userData });

export const deleteContact = (contactId, userId) =>
  ContactCollection.findOneAndDelete({ _id: contactId, userId });

export const updateContact = (contactId, userId, userData) =>
  ContactCollection.findOneAndUpdate({ _id: contactId, userId }, userData, {
    new: true,
  });
