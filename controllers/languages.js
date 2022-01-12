import Languages from '../models/languages.js';
import mongoose from 'mongoose';
export const getLanguages = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    try {
        const languages = await Languages.find({userID: id});
        console.log(languages)
        res.status(200).json(languages);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const addLanguages = async (req, res)=>{
    const languages = req.body;
    console.log(languages)
    const newLanguages = new Languages(languages);
    try {
        await newLanguages.save();

        res.status(201).json(newLanguages.languages);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}
export const updateLanguages = async (req, res)=>{
    const { id: _id } = req.params;
    const language = req.body;
    console.log(language);
    if(!mongoose.Types.ObjectId.isValid(language.languageID)) return res.status(404).send('no languages with id');
    const upadateLanguage = await Languages.findByIdAndUpdate(language.languageID, language, {new: true});
    const languages = await Languages.find({userID: language.languageID});
    res.json(languages);

}

export const deleteLanguages = async (req, res)=>{
    console.log(req.params);
     const { id} = req.params;
    // const certificates = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no certificates with id');
    const deleteLanguage = await Languages.findByIdAndRemove(id);
    res.json(deleteLanguage);

}