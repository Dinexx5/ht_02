type errormessage = {
    message: string,
    field: string
}
let blogs: any[] = []

type blogType = {
    "id": number,
    "name": string,
    "description": string,
    "websiteUrl": string
}
 export const blogsRepository = {
    createBlogs (name: string, description: string, websiteUrl: string) {

        let errorsMessages: errormessage[] = [];

        if (!name || typeof name !== 'string' || name.length > 15 || !name.trim()) {
            errorsMessages.push({
                message: "Incorrect name",
                field: "name"
            })
        }

        if (!description || typeof description !== 'string' || description.length > 500 || !description.trim()) {
            errorsMessages.push({
                message: "Incorrect description",
                field: "description"
            })
        }

        if (!websiteUrl || typeof websiteUrl !== 'string' || websiteUrl.length > 100 || !websiteUrl.trim()) {
            errorsMessages.push({
                message: "Incorrect websiteUrl",
                field: "websiteUrl"
            })
        }

        if (errorsMessages.length) {
            return(errorsMessages)
        }

        const newBlog: blogType  = {
            id: blogs.length,
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }

        blogs.push(newBlog)

        return newBlog
    },
    getProductById (id: number) {
        let blog = blogs.find(b => b.id === id)
        return blog
    },
    getAllProducts () {
        return blogs
    },
    deleteProductById (id: number) {
        for (let i = 0; i < blogs.length; i++)  {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true
            }
        }
        return false
    },
    UpdateProductById (id: number, name: string) {
        let foundBlog = blogs.find(b => b.id === id)

        let errorsMessages: errormessage[] = [];

        if (!foundBlog) {
            return false
        }
        foundBlog.name = name
        return true
    }
 }
