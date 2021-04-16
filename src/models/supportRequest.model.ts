import mongoose, { Schema } from 'mongoose'

const requestSchema:Schema = new Schema({

    made_by:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    issue:{
      type: String,
      required: true
    },

    status:{
        type: String,
        enum:['new request','addressed','closed'],
        default: 'new request'
    },

    addressed_by:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },

    closed_on:{
        type:Date
    }

}, { timestamps: true})

const requestModel = mongoose.model("SupportRequest", requestSchema);

export default  requestModel;