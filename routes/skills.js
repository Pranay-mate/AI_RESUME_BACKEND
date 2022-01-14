import express from 'express';
import { addSkills, getSkills, updateSkills, deleteSkills }  from '../controllers/skills.js';
const router = express.Router();

router.get('https://pranay-mate.github.io/skills/', getSkills);
router.get('https://pranay-mate.github.io/skills/:id', getSkills);

router.post('https://pranay-mate.github.io/skills/', addSkills);
router.put('https://pranay-mate.github.io/skills/:id', updateSkills);
router.delete('https://pranay-mate.github.io/skills/:id', deleteSkills);

export default router;