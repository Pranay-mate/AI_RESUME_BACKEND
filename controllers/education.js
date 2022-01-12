import Educations from '../models/education.js';
import mongoose from 'mongoose';
export const getEducation = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const educations = await Educations.find({userID: id});
        console.log(educations)
        res.status(200).json(educations);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addEducation = async (req, res)=>{
    const education = req.body;
    console.log(education)
    const newEducation = new Educations(education);

    try {
        await newEducation.save();

        res.status(201).json(newEducation.posts);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateEducation = async (req, res)=>{
    const { id: _id } = req.params;
    const education = req.body;
    console.log(education);

    if(!mongoose.Types.ObjectId.isValid(education.educationID)) return res.status(404).send('no educations with id');
    const updateUser = await Educations.findByIdAndUpdate(education.educationID, education, {new: true});
    const educations = await Educations.find({userID: education.educationID});
    console.log(educations)
    res.status(200).json(educations);

}

export const deleteEducation = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no educations with id');
    const deleteEducation = await Educations.findByIdAndRemove(id);
    res.json(deleteEducation);

}