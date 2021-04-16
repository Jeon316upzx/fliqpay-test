import mongoose , { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const SALT_WORK_FACTOR = 10;

const userSchema:Schema = new Schema({

    firstname:{
        type: String,
        required: true
    },

    email:{
      type:String,
      required: true
    },

    lastname:{
        type:String,
        required:true
    },
    usertype:{
        type: String,
        enum: ['customer', 'useragent', 'admin'],
        default: 'customer'
    },

    password:{
        type: String,
        required: true
    }

}, { timestamps: true })


userSchema.pre('save', async function save(this:any, next:any) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

const userModel = mongoose.model('User', userSchema )
export default  userModel;