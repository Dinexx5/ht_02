import {MongoClient} from "mongodb";

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

const mongoUri = "mongodb+srv://Dinexx5:3231810dimasD@cluster0.ptoddig.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)

const db = client.db("youtube");
export const blogsCollection = db.collection<blogType>("blogs")
export const postsCollection = db.collection<postType>("posts")


export async function runDb() {
    try {
        // Connect client tot the server
        await client.connect();
        // Establish and verify connection
        await client.db("youtube").command({ ping: 1 });
        console.log("Connected successfully to mongo server");
    } catch {
        console.log ("Can not connect to mongo db");
        //Ensures that client will close after finish/error
        await client.close()
    }
}