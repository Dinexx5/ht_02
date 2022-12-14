import {Request, Response, Router} from "express";
import {app, blogs, blogType, errormessage} from "../index";

export const blogsRouter = Router({})

//blogs validation

blogsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = blogs.find(b => b.id === +req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

blogsRouter.post('/', (req: Request, res: Response) => {

    let errorsMessages: errormessage[] = [];

    const { name, description, websiteUrl} = req.body

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
        res.status(400).send({'errorsMessages':errorsMessages})
        return
    }

    const newBlog: blogType  = {
        id: blogs.length,
        name: "string",
        description: "string",
        websiteUrl: "string"
    }

    blogs.push(newBlog)

    res.status(201).send(newBlog)
})

blogsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < blogs.length; i++)  {
        if (blogs[i].id === +req.params.id) {
            blogs.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

blogsRouter.put('/:id', (req: Request, res: Response) => {

    let foundBlog = blogs.find(p => p.id === +req.params.id)

    let errorsMessages: errormessage[] = [];

    const { name, description, websiteUrl} = req.body

    if (!foundBlog) {
        res.send(404)

    }

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
        res.status(400).send({'errorsMessages':errorsMessages})
        return
    }

    foundBlog.name = name
    foundBlog.description = description
    foundBlog.websiteUrl = websiteUrl


    res.status(204).send(foundBlog)

})