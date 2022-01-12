import express from 'express';
import { addEducation, getEducation, updateEducation, deleteEducation }  from '../controllers/education.js';
const router = express.Router();

router.get('/', getEducation);
router.get('/:id', getEducation);
router.post('/', addEducation);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

export default router;