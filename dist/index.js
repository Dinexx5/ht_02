"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_router_1 = require("./routes/posts-router");
const blogs_router_1 = require("./routes/blogs-router");
exports.app = (0, express_1.default)();
const port = 3001;
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.posts = [];
//tests purposes
// app.delete('/testing/all-data', (req: Request, res: Response) => {
//     blogs = []
//     posts = []
//     res.send(204)
// })
//app start
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
