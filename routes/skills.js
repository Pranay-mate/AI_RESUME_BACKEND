import express from 'express';
import { addSkills, getSkills, updateSkills, deleteSkills }  from '../controllers/skills.js';
const router = express.Router();

router.get('/', getSkills);
router.get('/:id', getSkills);

router.post('/', addSkills);
router.put('/:id', updateSkills);
router.delete('/:id', deleteSkills);

export default router;