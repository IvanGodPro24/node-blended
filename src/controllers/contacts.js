import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "../services/contacts.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts(req.user._id);

  res.json(contacts);
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body, req.user._id);

  res.status(201).json(contact);
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) throw createHttpError(404, "Contact not found!");

  res.sendStatus(204);
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  const newContact = await updateContact(contactId, req.user._id, req.body);

  res.json(newContact);
};
