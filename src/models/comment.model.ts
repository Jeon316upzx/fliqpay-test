import mongoose, { Schema } from 'mongoose'

const commentSchema:Schema = new Schema({

    made_by:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    support_request_id:{
        type: Schema.Types.ObjectId,
        ref:'SupportRequest',
        required:true
    },

    comment:{
        type: String,
        required: true
    }
    

}, { timestamps: true})
const commentModel =  mongoose.model("Comment", commentSchema)
export default commentModel;