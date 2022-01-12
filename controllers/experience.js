import Experiences from '../models/experience.js';
import mongoose from 'mongoose';

export const getExperience = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const experiences = await Experiences.find({userID: id});
        console.log(experiences)
        res.status(200).json(experiences);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addExperience = async (req, res)=>{
    const experiences = req.body;
    console.log(experiences)
    const newExperience = new Experiences(experiences);

    try {
        await newExperience.save();

        res.status(201).json(newExperience.posts);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateExperience = async (req, res)=>{
    const { id: _id } = req.params;
    const experience = req.body;
    console.log(experience);

    if(!mongoose.Types.ObjectId.isValid(experience.experienceID)) return res.status(404).send('no educations with id');
    const updateExperiences = await Experiences.findByIdAndUpdate(experience.experienceID, experience, {new: true});
    const experiences = await  Experiences.find({userID: experience.experienceID});
    console.log(experiences)
    res.status(200).json(experiences);

}

export const deleteExperience = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteExperience = await Experiences.findByIdAndRemove(id);
    res.json(deleteExperience);

}