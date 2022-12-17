"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_1 = require("../middlewares/input-validation");
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.postsRouter = (0, express_1.Router)({});
//posts validation
const titleValidation = (0, express_validator_1.body)('title').trim().not().isEmpty().withMessage('Not a string title');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').trim().not().isEmpty().withMessage('Not a string desc');
const contentValidation = (0, express_validator_1.body)('content').trim().not().isEmpty().withMessage('Not a string content');
const blogIdlValidation = (0, express_validator_1.body)('blogId').trim().not().isEmpty().withMessage('Not a string blogId');
exports.postsRouter.get('/', (req, res) => {
    const posts = posts_repository_1.postsRepository.getAllPosts();
    res.status(200).send(posts);
});
exports.postsRouter.get('/:id', (req, res) => {
    let post = posts_repository_1.postsRepository.getPostById(+req.params.id);
    if (!post) {
        res.send(404);
    }
    else {
        res.send(post);
    }
});
exports.postsRouter.post('/', input_validation_1.basicAuthorisation, titleValidation, shortDescriptionValidation, contentValidation, blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const foundBlog = blogs_repository_1.blogsRepository.getBlogById(+blogId);
    if (!foundBlog) {
        return res.send(404);
    }
    const newPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(201).send(newPost);
});
exports.postsRouter.delete('/:id', input_validation_1.basicAuthorisation, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePostById(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.put('/:id', input_validation_1.basicAuthorisation, titleValidation, shortDescriptionValidation, contentValidation, blogIdlValidation, input_validation_1.inputValidationMiddleware, (req, res) => {
    const id = +req.params.id;
    const { title, shortDescription, content, blogId } = req.body;
    const foundBlog = blogs_repository_1.blogsRepository.getBlogById(+blogId);
    if (!foundBlog) {
        res.send(404);
    }
    let isUpdated = posts_repository_1.postsRepository.UpdatePostById(id, title, shortDescription, content, blogId);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
