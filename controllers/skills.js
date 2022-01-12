import skills from '../models/skills.js';
import mongoose from "mongoose";
import path  from 'path';

export const getSkills = async (req, res)=>{
    const { id } = req.params;
    // console.log(id)
    try {
        const Skills = await skills.find({userID: id});
        // console.log(Skills);
        res.json(Skills);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addSkills = async (req, res)=>{
    const skill = req.body;

    const newSkills = new skills(skill);
    console.log(newSkills)

    try {
        await newSkills.save();
        res.status(201).json(newSkills.skill);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
export const updateSkills = async (req, res)=>{
    const { id: _id } = req.params;
    const skill = req.body;
    console.log(skill);
    console.log(_id);
    
    if(!mongoose.Types.ObjectId.isValid(skill.skillId)) return res.status(404).send('no skills with id');
    const updateSkills = await skills.findByIdAndUpdate(skill.skillId, skill, {new: true});
    const Skills = await skills.find({userID: skill.skillId});
    res.json(Skills);

}

export const deleteSkills = async (req, res)=>{
    try {
    console.log('reqparams');
   // console.log(req.params);
     const { id} = req.params;
     const skill = {skillId: id};
     console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no skills with id');
    const deleteSkill = await skills.findByIdAndRemove(id);
    const Skills = await skills.find({userID: skill.skillId});
    res.json(Skills);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}