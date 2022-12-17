import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {body} from "express-validator";
import {basicAuthorisation, inputValidationMiddleware} from "../middlewares/input-validation";

export const blogsRouter = Router({})

//blogs validation
const nameValidation = body('name').trim().isLength({max: 15}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
const descriptionValidation = body('description').trim().isLength({max: 500}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string')
const websiteUrlValidation = body('websiteUrl').trim().isLength({max:100}).withMessage('Url is too long').isURL().withMessage('Not a Url')


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
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {

        const {name, description, websiteUrl} = req.body
        const newBlog = blogsRepository.createBlogs(name, description, websiteUrl)
        res.status(201).send(newBlog)
    })

blogsRouter.delete('/:id',
    basicAuthorisation,
    (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteBlogById(+req.params.id)
    if (isDeleted) {
        res.status(204)
    } else {
        res.status(404)
    }
})

blogsRouter.put('/:id',
    basicAuthorisation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const id = +req.params.id

        const {name, description, websiteUrl} = req.body

        let isUpdated = blogsRepository.UpdateBlogById(id, name, description, websiteUrl)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })