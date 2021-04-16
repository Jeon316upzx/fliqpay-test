import  * as dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3000
const MONGO_URL:any = process.env.MONGO_URL
const API_VERSION:any = process.env.API_VERSION
const JWT_TOKEN_KEY:any = process.env.JWT_TOKEN_KEY


const MONGODB_OPTIONS = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true,
    poolSize:50,
    autoIndex:false,
    retryWrites:false
}


const config = {
    SERVER_PORT : SERVER_PORT,
    MONGO_URL: MONGO_URL,
    MONGODB_OPTIONS: MONGODB_OPTIONS,
    API_VERSION: API_VERSION,
    JWT_TOKEN_KEY: JWT_TOKEN_KEY
}

export default config;