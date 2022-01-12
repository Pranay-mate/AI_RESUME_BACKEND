import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const educationSchema = mongoose.Schema(
    {
        Program:  { type : String, required : true },
        Institude:  { type : String, required : true },
        SDate:  { type : String, required : true },
        PresetDate: Boolean,
        EDate: String,
        MarksObtained:  { type : String, required : true },
        userID: String
    }
);

const Educations = mongoose.model('Educations', educationSchema);

export default Educations;