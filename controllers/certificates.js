import Certificates from '../models/certificates.js';
import mongoose from 'mongoose';

export const getCertificates = async (req, res)=>{
    const { id } = req.params;
    // console.log(req.params)
    try {
        const certificates = await Certificates.find({userID: id});
        // console.log(certificates)
        res.status(200).json(certificates);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addCertificates = async (req, res)=>{
    const certificates = req.body;
        // console.log('++++++++++'+certificates)
    const newCertificate = new Certificates(certificates);
    try {
        await newCertificate.save();

        res.status(201).json(newCertificate.certificates);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateCertificates = async (req, res)=>{
    const { id: _id } = req.params;
    const certificate = req.body;
    // console.log('certificateID');
    // console.log(certificate);

    if(!mongoose.Types.ObjectId.isValid(certificate.certificateID)) return res.status(404).send('no certificates with id');
    const updateCertificate = await Certificates.findByIdAndUpdate(certificate.certificateID, certificate, {new: true});
    const certificates = await Certificates.find({userID: certificate.certificateID});
    res.status(200).json(certificates);

}

export const deleteCertificates = async (req, res)=>{
    // console.log(req.params);
    //  const { id} = req.params;
    //  console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteCertificate = await Certificates.findByIdAndRemove(id);
    res.json(deleteCertificate);

}