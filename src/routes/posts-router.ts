import {Request, Response, Router} from "express"
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation";
import {postsRepository} from "../repositories/posts-repository";


export const postsRouter = Router({})


//posts validation

const titleValidation = body('name').trim().isString()
const shortDescriptionValidation = body('description').trim().isString()
const contentValidation = body('websiteUrl').trim().isString()
const blogIdlValidation = body('websiteUrl').trim().isString()
const blogNameValidation = body('websiteUrl').trim().isString()


postsRouter.get('/', (req: Request, res: Response) => {
    const blogs = postsRepository.getAllPosts()
    res.status(200).send(blogs)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    let blog = postsRepository.getPostById(+req.params.id)
    if (!blog) {
        res.send(404)
    } else {
        res.send(blog)
    }
})

postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    blogNameValidation,
    (req: Request, res: Response) => {

        const {title, shortDescription, content, blogId, blogName} = req.body
        const newPost = postsRepository.createPost(title, shortDescription, content, blogId, blogName)
        res.status(201).send(newPost)
    })

postsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePostById(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    blogNameValidation,
    (req: Request, res: Response) => {

        const {id, title, shortDescription, content, blogId, blogName} = req.body

        let isUpdated = postsRepository.UpdatePostById(id, title, shortDescription, content, blogId, blogName)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })

// const titleValidation = body('name').trim().isString()
// const shortDescriptionValidation = body('description').trim().isString()
// const contentValidation = body('websiteUrl').trim().isString()
// const blogIdlValidation = body('websiteUrl').trim().isString()
// const blogNameValidation = body('websiteUrl').trim().isString()