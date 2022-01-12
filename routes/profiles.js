import express from 'express';
import { addProfile, getProfile, updateProfile, deleteProfile,reProfile }  from '../controllers/profiles.js';
const router = express.Router();

router.get('/', getProfile);
router.get('/:id', getProfile);
router.post('/', addProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;