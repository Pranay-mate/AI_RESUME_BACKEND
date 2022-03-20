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
import tf from '@tensorflow/tfjs';

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
        
        console.log('getskilldata')
        const skillsD = await skills.find({userID: req.body.userId});
        const existSkills = [];
        let missingSkillCount = 0;
        let RequiredSkills = [];
        skillsD.forEach(skillObj => {
            existSkills.push(skillObj.skill.toUpperCase());
        });
        let skillsMust = [];
        const a = tf.data.array([
                                {'0':['html','css','javascript','js']},
                                {'1':['html','anuglar','react']},
                                {'2':['html','css']},
                                {'3':['html','css','react']},
                                {'4':['css','react']},
                                {'5':['html','react']},
                                {'6':['html']},
                            ]);
                                // a.forEachAsync(e => console.log(e));
                                // const value = (await a.array())[0]
        let dataFound = false;
        await a.forEachAsync(e => {
            if(typeof(e[req.body.profile]) != 'undefined'){
                dataFound = true;
                skillsMust = e[req.body.profile];
            }
        });
    

        if(dataFound == true){
            skillsMust.forEach(skill => {
              if(existSkills.indexOf(skill.toUpperCase()) == -1){
                missingSkillCount++;
                RequiredSkills.push(skill);
              }
            });
      
            score = parseInt(skillsMust.length-missingSkillCount)/parseInt(skillsMust.length)*100;
            console.log("score")
            console.log(score)
        }else{
            score = -1;
            RequiredSkills = skillsMust;
            console.log(score)
        }


        // console.log(score);score

        const pdfData = [];
        const obj= {};
        console.log('getskilldata')
        // let skillsData = ['html','css','javascript','js'];
        // if(id!='1'){
            // skillsData = ['js'];
        // }
        
        setTimeout(() => {
            obj["skillsData"] = score;
            obj["RequiredSkills"] = RequiredSkills;
            obj["missingSkillCount"] = missingSkillCount;
            pdfData.push(obj);
            console.log(pdfData)
            res.status(200).json(pdfData);
        }, 1000);
        // console.log(certificates)
        // res.status(200).json(certificates);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
