import {Request, Response, Router} from "express";
import {app} from "../index";
import {blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})

//blogs validation

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getAllProducts()
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = blogsRepository.getProductById(+req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

blogsRouter.post('/', (req: Request, res: Response) => {

    const { name, description, websiteUrl} = req.body
    const newBlogOrErrorMes = blogsRepository.createBlogs(name, description, websiteUrl)

    if (Array.isArray(newBlogOrErrorMes)) {
        res.status(400).send({'errorsMessages':newBlogOrErrorMes})
    } else {
        res.status(201).send(newBlogOrErrorMes)
    }
})

blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteProductById(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

blogsRouter.put('/:id', (req: Request, res: Response) => {

    let isUpdated = blogsRepository.UpdateProductById(+req.params.id, req.body.name)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)

    }
})