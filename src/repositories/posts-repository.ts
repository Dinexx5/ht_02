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
    createPost (title: string, shortDescription: string, content: string, blogId: string, blogName: string) {

        const newPost: postType  = {
            id: posts.length,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
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
    UpdatePostById (id: number, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        let foundBlog = posts.find(p => p.id === id)

        if (!foundBlog) {
            return false
        }
        foundBlog.name = name
        return true
    }
}