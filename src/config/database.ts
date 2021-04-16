import mongoose from 'mongoose'
import config from './config'
import logger from './logger'

// console.log("Helldnjjdjd")
const db:any = mongoose.connect(config.MONGO_URL, config.MONGODB_OPTIONS).then(()=>{
    logger.info(`Database Connected 🚀`)
}).catch((error)=>{
    logger.error(`${error} 😱`)
});


export default db;