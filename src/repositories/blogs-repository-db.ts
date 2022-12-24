import {blogsCollection, blogType} from "./db";



 export const blogsRepository = {



    async getAllBlogs (): Promise<blogType[]> {

        return await blogsCollection.find().toArray()
     },



    async createBlogs (name: string, description: string, websiteUrl: string): Promise<blogType> {
        const newBlog: blogType  = {
            id: new Date().toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString()
        }
        await blogsCollection.insertOne(newBlog)
        return newBlog
    },


    async getBlogById (id: string): Promise<blogType | null> {

        let blog: blogType | null = await blogsCollection.findOne({id: id})
        if (blog) {
            return blog
        } else {
            return null
        }
    },



    async deleteBlogById (id: string): Promise<boolean> {
        let result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },




    async UpdateBlogById (id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        let result = await blogsCollection.updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
        return result.matchedCount === 1


    }
 }
