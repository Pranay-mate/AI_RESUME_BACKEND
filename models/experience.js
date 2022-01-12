import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const experinceSchema = mongoose.Schema(
    {
        Title: { type : String, required : true },
        Workplace: { type : String, required : true },
        SDate: { type : String, required : true },
        EDate: { type : String, required : true },
        PresetDate: Boolean,
        WorkplaceAdd: String,
        Achievements: String,
        ContactInfo: String,
        userID: String,

    }
);

const Experiences = mongoose.model('Experiences', experinceSchema);

export default Experiences;