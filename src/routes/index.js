import express from 'express';
const router = express.Router();
import contactroute from './contactroute';
import authroute from './authroute';

router.use('/contact',contactroute);
router.use('/auth',authroute);


export default router;