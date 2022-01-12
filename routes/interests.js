import express from 'express';
import { addInterests, getInterests, updateInterests, deleteInterests }  from '../controllers/interests.js';
const router = express.Router();

router.get('/', getInterests);
router.get('/:id', getInterests);
router.post('/', addInterests);
router.put('/:id', updateInterests);
router.delete('/:id', deleteInterests);

export default router;