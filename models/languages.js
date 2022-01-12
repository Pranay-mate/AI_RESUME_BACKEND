import mongoose from 'mongoose';

const languageSchema = mongoose.Schema(
    {
        Language: { type : String, required : true },
        Proficiency: { type : String, required : true },
        userID: String,
    }
);

export default mongoose.model('Languages', languageSchema);
