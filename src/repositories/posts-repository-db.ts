import {blogsRepository} from "./blogs-repository-db";
import {blogType, postsCollection, postType} from "./db";


export const postsRepository = {

    async createPost (title: string, shortDescription: string, content: string, blogId: string): Promise<postType> {
        let foundBlog = await blogsRepository.getBlogById(blogId)
        const newPost: postType  = {
            id: new Date().toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog!.name,
            createdAt: new Date().toISOString()
        }
        await postsCollection.insertOne(newPost)
        return newPost
    },



    async getPostById (id: string): Promise<postType | null> {
        let post : postType | null = await postsCollection.findOne({id: id})
        if (post) {
            return post
        } else {
            return null
        }
    },



    async getAllPosts (): Promise<postType[]> {
        return await postsCollection.find().toArray()
    },



    async deletePostById (id: string): Promise<boolean> {
        let result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async UpdatePostById (id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        let foundBlog: blogType | null = await blogsRepository.getBlogById(blogId)
        if (!foundBlog) {
            return false
        }
        let result = await postsCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
        return result.matchedCount === 1
    }
}