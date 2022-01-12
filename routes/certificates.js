import express from 'express';
import { addCertificates , getCertificates , updateCertificates, deleteCertificates }  from '../controllers/certificates.js';
const router = express.Router();

router.get('/', getCertificates);
router.get('/:id', getCertificates);
router.post('/', addCertificates);
router.put('/:id', updateCertificates);
router.delete('/:id', deleteCertificates);

export default router;