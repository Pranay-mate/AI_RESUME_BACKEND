import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const interestSchema = mongoose.Schema(
    {
        interest:  { type : String, required : true },
        userID: String,
    }
);

const Interests = mongoose.model('Interests', interestSchema);

export default Interests;