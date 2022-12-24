import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

export type blogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string
}

export type postType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

const mongoUri = process.env.MONGO_URL
if (!mongoUri) {
    throw new Error("No mongo URL")
}
const client = new MongoClient(mongoUri)

const db = client.db("youtube-dev");
export const blogsCollection = db.collection<blogType>("blogs")
export const postsCollection = db.collection<postType>("posts")


export async function runDb() {
    try {
        // Connect client tot the server
        await client.connect();
        // Establish and verify connection
        await client.db("youtube-dev").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    } catch {
        console.log ("Can not connect to mongo db");
        //Ensures that client will close after finish/error
        await client.close()
    }
}