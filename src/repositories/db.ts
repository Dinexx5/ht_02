import {MongoClient} from "mongodb";

const mongoUri = "mongodb+srv://Dinexx5:3231810dimasD@cluster0.ptoddig.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(mongoUri)



export async function runDb() {
    try {
        // Connect client tot the server
        await client.connect();
        // Establish and verify connection
        await client.db("blogs").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    } catch {
        console.log ("Can not connect to mongo db");
        //Ensures that client will close after finish/error
        await client.close()
    }
}