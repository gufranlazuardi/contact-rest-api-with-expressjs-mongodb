const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access public

const getContactById = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);

    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contacts);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Update contact for ${req.params.id}` });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
