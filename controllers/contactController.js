const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access private

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
//@access private

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
        user_id: req.user.id,
    });

    res.status(201).json(contacts);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    // cari contact nya dulu, sama kaya getContactById
    const contacts = await Contact.findById(req.params.id);

    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // user only can update their own contact
    if (contacts.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(
            "User don't have permission to update other user contacts"
        );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(201).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    // Find the contact first
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // user only can delete their own contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(
            "User don't have permission to delete other user contacts"
        );
    }

    // Delete the contact
    await Contact.deleteOne({ _id: req.params.id });

    // Send a success response
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
