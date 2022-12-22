import {client} from "./db";

let __blogs: any[] = []

export type blogType = {
    "id": string,
    "name": string,
    "description": string,
    "websiteUrl": string
}

 export const blogsRepository = {

    async createBlogs (name: string, description: string, websiteUrl: string): Promise<blogType> {

        const newBlog: blogType  = {
            id: __blogs.length.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        __blogs.push(newBlog)
        return newBlog
    },

    async getBlogById (id: string): Promise<blogType | null> {

        let blog: blogType | null = await client.db("youtube").collection<blogType>('blogs').findOne({id: id})
        return blog
    },

    async getAllBlogs (): Promise<blogType[]> {
        return __blogs
    },

    async deleteBlogById (id: string): Promise<boolean> {
        for (let i = 0; i < __blogs.length; i++)  {
            if (__blogs[i].id === id) {
                __blogs.splice(i, 1);
                return true
            }
        }
        return false
    },

    async UpdateBlogById (id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        let foundBlog: blogType | undefined = __blogs.find(b => b.id === id)

        if (!foundBlog) {
            return false
        }
        foundBlog.name = name
        foundBlog.description = description
        foundBlog.websiteUrl = websiteUrl
        return true


    }
 }
