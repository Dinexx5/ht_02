import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation";

export const blogsRouter = Router({})

//blogs validation
const nameValidation = body('name').trim().isLength({max:15}).isString()
const descriptionValidation = body('description').trim().isLength({max:500}).isString()
const websiteUrlValidation = body('websiteUrl').trim().isLength({max:100}).isURL()


blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = blogsRepository.getBlogById(+req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

blogsRouter.post('/',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {

        const {name, description, websiteUrl} = req.body
        const newBlog = blogsRepository.createBlogs(name, description, websiteUrl)
        res.status(201).send(newBlog)
    })

blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteBlogById(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

blogsRouter.put('/:id',
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {

        const {id, name, description, websiteUrl} = req.body

        let isUpdated = blogsRepository.UpdateBlogById(id, name, description, websiteUrl)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })