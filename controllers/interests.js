import Interests from '../models/interests.js';
import mongoose from 'mongoose';
export const getInterests = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const interests = await Interests.find({userID: id});
        console.log(interests)
        res.status(200).json(interests);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addInterests = async (req, res)=>{
    const interest = req.body;
    console.log(interest)
    const newInterest = new Interests(interest);
    try {
        await newInterest.save();

        res.status(201).json(newInterest.interest);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateInterests = async (req, res)=>{
    const { id: _id } = req.params;
    const interest= req.body;
    console.log(interest);

    if(!mongoose.Types.ObjectId.isValid(interest.interestID)) return res.status(404).send('no interests with id');
    const updateInterest = await Interests.findByIdAndUpdate(interest.interestID, interest, {new: true});
    const interests = await Interests.find({userID: interest.interestID});
    console.log(interests)
    res.json(interests);

}

export const deleteInterests = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
     console.log(id);
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteInterest = await Interests.findByIdAndRemove(id);
    res.json(deleteInterest);

}