import mongoose from 'mongoose';
import Educations from '../models/education.js';
import Experiences from '../models/experience.js';
import Interests from '../models/interests.js';
import Languages from '../models/languages.js';
import Projects from '../models/projects.js';
import skills from '../models/skills.js';
import Certificates from '../models/certificates.js'; 
import Profiles from '../models/profiles.js';  
import {WebhookClient} from 'dialogflow-fulfillment';

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


export const getSkillsData = async (req, res)=>{
    const { id } = req.params;
    console.log(req.body)
    var score = 0;
    try {
        
        const agent = new WebhookClient({req, res});
        console.log(agent)

        console.log('getskilldata')
        const skillsD = await skills.find({userID: req.body.userId});
        const existSkills = [];
        let missingSkillCount = 0;
        skillsD.forEach(skillObj => {
            existSkills.push(skillObj.skill.toUpperCase());
        });
        let skillsMust = [];
        const a = tf.data.array([{'item': 1}, {'item': 2}, {'item': 3}]);
        await a.forEachAsync(e => console.log(e));

        switch (req.body.profile) {
            case 1:
                skillsMust = ['html','css','javascript','js'];
            break;
            case 2:
                skillsMust = ['html','css','react'];
            break;
            case 3:
                skillsMust = ['html','css','js'];
            break;
            case '4':
                skillsMust = ['html','javascript','js'];
            break;
            default:
                skillsMust = ['html'];
            break;
        }
        console.log(skillsMust)
        // let skillsMust = ['html','css','javascript','js'];
        skillsMust.forEach(skill => {
          if(existSkills.indexOf(skill.toUpperCase()) == -1){
            missingSkillCount++;
          }
        });
  
        score = parseInt(skillsMust.length-missingSkillCount)/parseInt(skillsMust.length)*100;
        console.log(score);

        const pdfData = [];
        const obj= {};
        console.log('getskilldata')
        // let skillsData = ['html','css','javascript','js'];
        // if(id!='1'){
            // skillsData = ['js'];
        // }
        
        setTimeout(() => {
            obj["skillsData"] = score;
            pdfData.push(obj);
            res.status(200).json(pdfData);
        }, 1000);
        // console.log(certificates)
        // res.status(200).json(certificates);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
