import express from 'express';
import { getScore}  from '../controllers/dashboard.js';
const router = express.Router();

router.get('/:id', getScore );

export default router;