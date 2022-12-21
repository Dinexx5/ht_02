import {blogsRepository, blogType} from "./blogs-repository";

let posts: postType[] = []

export type postType = {
    "id": string,
    "title": string,
    "shortDescription": string,
    "content": string,
    "blogId": string,
    "blogName": string
}

export const postsRepository = {

    async createPost (title: string, shortDescription: string, content: string, blogId: string): Promise<postType | undefined> {
        let foundBlog: blogType | undefined = await blogsRepository.getBlogById(blogId)
        if (foundBlog) {
            const newPost: postType  = {
                id: posts.length.toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name
            }
            posts.push(newPost)
            return newPost
        }
    },

    async getPostById (id: string): Promise<postType | undefined> {
        let post: postType | undefined = posts.find(p => p.id === id)
        return post
    },

    async getAllPosts (): Promise<postType[]> {
        return posts
    },

    async deletePostById (id: string): Promise<boolean> {
        for (let i = 0; i < posts.length; i++)  {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true
            }
        }
        return false
    },

    async UpdatePostById (id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        let foundBlog: blogType | undefined = await blogsRepository.getBlogById(blogId)
        let foundPost: postType | undefined = posts.find(p => p.id === id)

        if (!foundPost || !foundBlog) {
            return false
        }
        foundPost.title = title
        foundPost.shortDescription = shortDescription
        foundPost.content = content
        foundPost.blogId = blogId
        foundPost.blogName = foundBlog.name

        return true
    }
}