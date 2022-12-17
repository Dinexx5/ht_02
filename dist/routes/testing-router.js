"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete('/all-data', (req, res) => {
    let blogs = blogs_repository_1.blogsRepository.getAllBlogs();
    blogs.splice(0, blogs.length);
    let posts = posts_repository_1.postsRepository.getAllPosts();
    posts.splice(0, blogs.length);
    res.send(204);
});
