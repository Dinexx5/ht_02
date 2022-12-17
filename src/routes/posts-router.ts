import {Request, Response, Router} from "express"
import {body} from "express-validator";
import {basicAuthorisation, inputValidationMiddleware} from "../middlewares/input-validation";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";



export const postsRouter = Router({})


//posts validation

const titleValidation = body('title').trim().not().isEmpty().withMessage('Not a string title')
const shortDescriptionValidation = body('shortDescription').trim().not().isEmpty().withMessage('Not a string desc')
const contentValidation = body('content').trim().not().isEmpty().withMessage('Not a string content')
const blogIdlValidation = body('blogId').trim().not().isEmpty().withMessage('Not a string blogId')




postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getAllPosts()
    res.status(200).send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.getPostById(req.params.id)
    if (!post) {
        res.send(404)
    } else {
        res.send(post)
    }
})

postsRouter.post('/',
    basicAuthorisation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {

        const {title, shortDescription, content, blogId} = req.body
        const foundBlog = blogsRepository.getBlogById(blogId)
        if (!foundBlog) {
           return res.send(404)
        }
        const newPost = postsRepository.createPost(title, shortDescription, content, blogId)
        res.status(201).send(newPost)
    })

postsRouter.delete('/:id',
    basicAuthorisation,
    (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePostById(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.put('/:id',
    basicAuthorisation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdlValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body
        const foundBlog = blogsRepository.getBlogById(blogId)
        if (!foundBlog) {
            res.send(404)
        }

        let isUpdated = postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })
