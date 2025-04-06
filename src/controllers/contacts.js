import { createContact, getAllContacts } from "../services/contacts.js";

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts(req.user._id);

  res.json(contacts);
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body, req.user._id);

  res.status(201).json(contact);
};
