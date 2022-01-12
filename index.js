import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import pdf from 'html-pdf';
import pdfTemplate from './documents/index.js';

import profileRoutes from './routes/profiles.js';
import userRouter from "./routes/user.js";
import skillRouter from "./routes/skills.js";
import educationRouter from "./routes/education.js";
import interestRouter from "./routes/interests.js";
import languageRouter from "./routes/languages.js";
import experienceRouter from "./routes/experience.js";
import projectRouter from "./routes/projects.js";
import certificateRouter from "./routes/certificates.js";
import dashboardRouter from "./routes/dashboard.js"

import Educations from './models/education.js';
import Experiences from './models/experience.js';
import Interests from './models/interests.js';
import Languages from './models/languages.js';
import Projects from './models/projects.js';
import skills from './models/skills.js';
import Certificates from './models/certificates.js'; 
import Profiles from './models/profiles.js';  
import path  from 'path';

const app = express();

app.use(bodyParser.json({limit: '30mb', extends: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extends: true}));
app.use(cors()); 



app.post('/create-pdf', (req, res) => {
  const userId = req.body.userId;
  var score = 0;
  const Apis = [Profiles,Educations, Experiences, Interests, Languages, Projects, skills, Certificates];
  const ApiNames = ["Profiles","Educations", "Experiences", "Interests", "Languages", "Projects", "Skills", "Certificates"];
  const pdfData = [];
  const obj ={};
  Apis.forEach(async (api,i) => {
    const resData = await api.find({userID: userId});
    if(resData.length > 0){
      score++;
    }
    obj[ApiNames[i]] = resData;
  });
  setTimeout(() => {
    score = ~~(score/(Apis.length)*100);
    obj["score"] = score;
    pdfData.push(obj);
    // res.status(200).json(pdfData);
  }, 1000);
  
  setTimeout(() => {
    // console.log(pdfData[0])
    pdf.create(pdfTemplate(pdfData[0]), {}).toFile('result.pdf', (err) => {
      if(err) {
        res.send(Promise.reject());
      } 
      res.send(Promise.resolve());
    });
  }, 2000);
});

app.get('/fetch-pdf', (req, res) => {
  // console.log(req);
  // console.log(res);
  res.sendFile('/result.pdf', { root: '.' });
})

app.use('/score', dashboardRouter);
app.use('/profile', profileRoutes);
app.use("/user", userRouter);
app.use("/skills", skillRouter);
app.use("/education", educationRouter);
app.use("/interests", interestRouter);
app.use("/languages", languageRouter);
app.use("/experience", experienceRouter);
app.use("/projects", projectRouter);
app.use("/certificates", certificateRouter);


// deploymentstart
// global.dirname = '';
// dirname = path.resolve();
// app.use(express.static(path.join(pathName,'/client/build')));
// app.get('*', (req, res) => {
//   console.log(pathName+'/client/build/index.html')
//   res.sendFile(path.resolve(pathName,'client','build','index.html'));
// });


// app.use(express.static(path.join(dirname, "client/build")));
// app.get("*", function (req, res) {
//   res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
//   res.sendFile(
//     path.join(dirname, "./client/build", "index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });


// deploymentend


const uri = "mongodb+srv://Pranay:Pranay@123@cluster0.i5amh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

  mongoose.set('useFindAndModify', false);