"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const express_validator_1 = require("express-validator");
const input_validation_1 = require("../middlewares/input-validation");
exports.blogsRouter = (0, express_1.Router)({});
//blogs validation
const nameValidation = (0, express_validator_1.body)('name').trim().isLength({ max: 15 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string');
const descriptionValidation = (0, express_validator_1.body)('description').trim().isLength({ max: 500 }).withMessage('Incorrect length').not().isEmpty().withMessage('Not a string');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isLength({ max: 100 }).withMessage('Url is too long').isURL().withMessage('Not a Url');
exports.blogsRouter.get('/', (req, res) => {
    const blogs = blogs_repository_1.blogsRepository.getAllBlogs();
    res.status(200).send(blogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs_repository_1.blogsRepository.getBlogById(req.params.id);
    if (!blog) {
        res.send(404);
    }
    else {
        res.send(blog);
    }
});
exports.blogsRouter.post('/', input_validation_1.basicAuthorisation, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_1.inputValidationMiddleware, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog = blogs_repository_1.blogsRepository.createBlogs(name, description, websiteUrl);
    res.status(201).send(newBlog);
});
exports.blogsRouter.delete('/:id', input_validation_1.basicAuthorisation, (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlogById(req.params.id);
    if (isDeleted) {
        res.status(204);
    }
    else {
        res.status(404);
    }
});
exports.blogsRouter.put('/:id', input_validation_1.basicAuthorisation, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_1.inputValidationMiddleware, (req, res) => {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    let isUpdated = blogs_repository_1.blogsRepository.UpdateBlogById(id, name, description, websiteUrl);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
