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
            { "1" : ["HTML","CSS","JavaScript","JQuery","Software Development","Object-Oriented Programming","Teamwork"]},
            { "2" : ["HTML","CSS","JavaScript","JQuery","Responsive web design","SEO"]},
            { "3" : ["HTML","CSS","JavaScript","JQuery","React","mongodb","node","express"]},
            { "4" : ["HTML","CSS","JavaScript","JQuery","Angular","mongodb","node","express"]},
            { "5" : ["HTML","CSS","JavaScript","Php","Laravel"]},
            { "6" : ["HTML","CSS","JavaScript","Php","Laravel"]},
            { "7" : ["Linux","Networking","Data storage","security"]},
            { "8" : ["Hardware","Software","SAP","Linux"]},
            { "9" : ["JavaScript","Networking","JQuery","Analytical skills","Problem-solving","Linux"]},
            { "11" : ["Time Management","Leadership","Risk Management","Critical Thinking","Problem Solving","Linux"]},
            { "12" : ["Linux","Hardware"]},
            { "13" : ["HTML","CSS","JavaScript"]},
            { "14" : ["Object-Oriented Programming","Java","Core java","version control"]},
            { "15" : ["Python","Linux","Machine Learning","Deep Learning","Mathematics","Programming","Statistics"]}
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
