const Contact = require('../models/contact.model');

// GET all contacts
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

// GET contact by ID
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

// CREATE contact
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    next(err);
  }
};

// UPDATE contact
exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Contact.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    next(err);
  }
};

// DELETE contact
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Contact.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    next(err);
  }
};
