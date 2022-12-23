import {Request, Response, Router} from "express"
import {body} from "express-validator";
import {basicAuthorisation, inputValidationMiddleware} from "../middlewares/input-validation";
import {postsRepository} from "../repositories/posts-repository-db";
import {blogsRepository} from "../repositories/blogs-repository-db";
import {blogType, postType} from "../repositories/db";



export const postsRouter = Router({})


//posts validation

const titleValidation = body('title').trim().isLength({max: 30}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string title')
const shortDescriptionValidation = body('shortDescription').trim().isLength({max: 100}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string desc')
const contentValidation = body('content').trim().isLength({max: 1000}).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string content')
const blogIdlValidation = body('blogId').trim().not().isEmpty().withMessage('Not a string blogId').isLength({max: 4}).withMessage('Incorrect length of blogId')




postsRouter.get('/', async (req: Request, res: Response) => {
    const posts: postType[] = await postsRepository.getAllPosts()
    res.status(200).send(posts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    let post: postType | null = await postsRepository.getPostById(req.params.id)
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
    async (req: Request, res: Response) => {

        const {title, shortDescription, content, blogId} = req.body
        const foundBlog: blogType | null = await blogsRepository.getBlogById(blogId)
        if (!foundBlog) {
           return res.send(404)
        }
        const newPost: postType | null = await postsRepository.createPost(title, shortDescription, content, blogId)
        res.status(201).send(newPost)
    })

postsRouter.delete('/:id',
    basicAuthorisation,
    async (req: Request, res: Response) => {
    const isDeleted: boolean = await postsRepository.deletePostById(req.params.id)
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
    async (req: Request, res: Response) => {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body

        let isUpdated: boolean = await postsRepository.UpdatePostById(id, title, shortDescription, content, blogId)

        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)

        }
    })
