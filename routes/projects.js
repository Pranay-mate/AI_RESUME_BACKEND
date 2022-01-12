import express from 'express';
import { addProjects, getProjects, updateProjects, deleteProjects }  from '../controllers/projects.js';
const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjects);
router.post('/', addProjects);
router.put('/:id', updateProjects);
router.delete('/:id', deleteProjects);


export default router;