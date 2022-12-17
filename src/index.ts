import express, {Request, Response, Router} from 'express'
import bodyParser from "body-parser";
import {postsRouter} from "./routes/posts-router";
import {blogsRouter} from "./routes/blogs-router";
import {testingRouter} from "./routes/testing-router";

export const app = express()
const port = 3001

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/posts', postsRouter)
app.use('/blogs', blogsRouter)
app.use('/testing', testingRouter)


//app start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
