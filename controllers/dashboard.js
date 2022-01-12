import mongoose from 'mongoose';
import Educations from '../models/education.js';
import Experiences from '../models/experience.js';
import Interests from '../models/interests.js';
import Languages from '../models/languages.js';
import Projects from '../models/projects.js';
import skills from '../models/skills.js';
import Certificates from '../models/certificates.js'; 
import Profiles from '../models/profiles.js';  

export const getScore = async (req, res)=>{
    const { id } = req.params;
    console.log(req.params)
    var score = 0;
    try {
        const Apis = [Profiles,Educations, Experiences, Interests, Languages, Projects, skills, Certificates];
        const ApiNames = ["Profiles","Educations", "Experiences", "Interests", "Languages", "Projects", "Skills", "Certificates"];
        const obj ={};
        // const name = '';
        const pdfData = [];
        // await Promise.all(Apis.map(api => {
            // console.log(api)
            // }))
            Apis.forEach(async (api,i) => {
                const resData = await api.find({userID: id});
                if(resData.length > 0){
                    score++;
                }
                // const data = {api: resData};
                // pdfData[ApiNames[i]] = resData;
                //  name = ApiNames[i];
                obj[ApiNames[i]] = resData;
                // console.log(ApiNames[i]);
            });
            setTimeout(() => {
                score = ~~(score/(Apis.length)*100);
                obj["score"] = score;
                pdfData.push(obj);
                res.status(200).json(pdfData);
            }, 1000);
        //console.log(certificates)
        //res.status(200).json(certificates);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
