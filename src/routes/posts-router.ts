import {Request, Response, Router} from "express"
import {app, posts} from "../index";

export const postsRouter = Router({})


//posts validation

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
    if (!post) {
        res.send(404)
    } else {
        res.send(post)
    }
})