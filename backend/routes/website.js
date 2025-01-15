import express from 'express';
import { createwebsite, deleteWebsite, getAllWebsites } from '../controllers/website.js';
import userAuth from '../middleware/user.js';
const router = express.Router();

router.post('/website', userAuth,createwebsite);
router.delete('/website/:webId', userAuth, deleteWebsite);
router.get('/website/', userAuth, getAllWebsites);

export default router;
