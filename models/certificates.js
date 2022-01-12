import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const certificateSchema = mongoose.Schema(
    {
        CertiName: { type : String, required : true },
        SDate: { type : String, required : true },
        EDate:  { type : String, required : true },
        Description:  { type : String, required : true },
        userID: { type : String, required : true },
    }
);

const Certificates = mongoose.model('Certificate', certificateSchema);

export default Certificates;