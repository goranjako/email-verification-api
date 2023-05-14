import express from 'express';
const {validateRegistrationBody,validateLoginBody,validateContactBody, validate} = require('../util/validation');

import ContactController from '../controllers/contact.controller';
import authManager from '../util/auth';


const router = express.Router();
router.post('/',authManager.verifyToken,validateContactBody(),validate,ContactController.create);
router.get('/',authManager.verifyToken,ContactController.getAll);
router.get('/:id',authManager.verifyToken,ContactController.get);
router.put('/:id',authManager.verifyToken,validateContactBody(),validate,ContactController.put);
router.delete('/:id',authManager.verifyToken,ContactController.delete);

export default router;