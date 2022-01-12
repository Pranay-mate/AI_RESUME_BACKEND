import express from 'express';
import { addExperience, getExperience, updateExperience, deleteExperience }  from '../controllers/experience.js';
const router = express.Router();

router.get('/', getExperience);
router.get('/:id', getExperience);
router.post('/', addExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

export default router;