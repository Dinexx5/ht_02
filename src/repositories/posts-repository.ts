import {blogsRepository} from "./blogs-repository";

let posts: any[] = []

type postType = {
    "id": string,
    "title": string,
    "shortDescription": string,
    "content": string,
    "blogId": string,
    "blogName": string
}

export const postsRepository = {
    createPost (title: string, shortDescription: string, content: string, blogId: string) {
        let foundBlog = blogsRepository.getBlogById(blogId)
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
    getPostById (id: string) {
        let post = posts.find(p => p.id === id)
        return post
    },
    getAllPosts () {
        return posts
    },
    deletePostById (id: string) {
        for (let i = 0; i < posts.length; i++)  {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true
            }
        }
        return false
    },
    UpdatePostById (id: string, title: string, shortDescription: string, content: string, blogId: string) {
        let foundBlog = blogsRepository.getBlogById(blogId)
        let foundPost = posts.find(p => p.id === id)

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