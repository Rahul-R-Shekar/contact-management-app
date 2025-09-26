const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');

router.get('/', controller.getAllContacts);
router.post('/', controller.createContact);
router.get('/:id', controller.getContactById);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;
