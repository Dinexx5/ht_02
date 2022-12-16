import {blogs, blogsRepository} from "./blogs-repository";


let posts: any[] = []

type postType = {
    "id": number,
    "title": string,
    "shortDescription": string,
    "content": string,
    "blogId": string,
    "blogName": string
}

export const postsRepository = {
    createPost (title: string, shortDescription: string, content: string, blogId: string) {
        let foundBlog = blogs.find(b => b.id === blogId)

        const newPost: postType  = {
            id: posts.length,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: foundBlog.name
        }
        posts.push(newPost)
        return newPost
    },
    getPostById (id: number) {
        let post = posts.find(p => p.id === id)
        return post
    },
    getAllPosts () {
        return posts
    },
    deletePostById (id: number) {
        for (let i = 0; i < posts.length; i++)  {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true
            }
        }
        return false
    },
    UpdatePostById (id: number, title: string, shortDescription: string, content: string, blogId: string) {
        let foundBlog = blogs.find(b => b.id === blogId)
        let foundPost = posts.find(p => p.id === id)

        if (!foundPost) {
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