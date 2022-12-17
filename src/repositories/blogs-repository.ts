let blogs: blogType[] = []

export type blogType = {
    "id": string,
    "name": string,
    "description": string,
    "websiteUrl": string
}
 export const blogsRepository = {
    createBlogs (name: string, description: string, websiteUrl: string) {

        const newBlog: blogType  = {
            id: blogs.length.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    getBlogById (id: string) {
        let blog = blogs.find(b => b.id === id)
        return blog
    },
    getAllBlogs () {
        return blogs
    },
    deleteBlogById (id: string) {
        for (let i = 0; i < blogs.length; i++)  {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true
            }
        }
        return false
    },
    UpdateBlogById (id: string, name: string, description: string, websiteUrl: string) {
        let foundBlog = blogs.find(b => b.id === id)

        if (!foundBlog) {
            return false
        }
        foundBlog.name = name
        foundBlog.description = description
        foundBlog.websiteUrl = websiteUrl
        return true


    }
 }
