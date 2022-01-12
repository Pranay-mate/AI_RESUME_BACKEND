import express from 'express';
import { addLanguages, getLanguages, updateLanguages, deleteLanguages }  from '../controllers/languages.js';
const router = express.Router();

router.get('/', getLanguages);
router.get('/:id', getLanguages);
router.post('/', addLanguages);
router.put('/:id', updateLanguages);
router.delete('/:id', deleteLanguages);

export default router;