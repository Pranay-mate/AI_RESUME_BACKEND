import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        ProjectName: { type : String, required : true },
        PresetDate: Boolean,
        SDate: { type : String, required : true },
        EDate:  { type : String, required : true },
        Description:  { type : String, required : true },
        userID: { type : String, required : true },
    }
);

const Projects = mongoose.model('Projects', projectSchema);

export default Projects;