import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository-inmemory";
export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    let blogs = await blogsRepository.getAllBlogs()
    blogs.splice(0,blogs.length)
    let posts = await postsRepository.getAllPosts()
    posts.splice(0,blogs.length)
    res.send(204)
})