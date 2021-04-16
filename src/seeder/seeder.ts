
// require the necessary libraries
const MongoClient = require("mongodb").MongoClient;
import bcrypt from 'bcryptjs';


const SALT_WORK_FACTOR = 10;

async function seedDB() {

    // Connection URL
    const uri = "mongodb+srv://mazi:maziuwa@cluster0.28o1r.mongodb.net/fliqpay?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log("Connected for seeding, please wait...");
        const collection = client.db("fliqpay").collection("users");

        await collection.drop()

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        let password = await bcrypt.hash('didi12345', salt);
        
        let users = [
                { firstname: "Dan", lastname: "Brown", email: "danibenz@gmail.com" , password: password , usertype:"customer"},
                { firstname: "Agent", lastname: "faust", email: "test2@gmail.com" , password: password , usertype:"useragent"},
                { firstname: "Admin", lastname: "Mazi", email: "Admin@gmail.com" , password: password , usertype:"admin"}
        ]


        let done = await collection.insertMany(users);

        if(done){
            console.log("Database populated!");
        }

        client.close();
        
        
                  
    } catch (err) {
        console.log(err.stack);
    }
}


export {
    seedDB
}