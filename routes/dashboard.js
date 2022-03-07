import express from 'express';
import { getScore,getSkillsData}  from '../controllers/dashboard.js';
const router = express.Router();

router.get('/:id', getScore );
router.post('/', getSkillsData );

export default router;