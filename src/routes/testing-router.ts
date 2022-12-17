import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";
export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    let blogs = blogsRepository.getAllBlogs()
    blogs.splice(0,blogs.length)
    let posts = postsRepository.getAllPosts()
    posts.splice(0,blogs.length)
    res.send(204)
})