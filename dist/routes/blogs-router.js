"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
//blogs validation
exports.blogsRouter.get('/', (req, res) => {
    const blogs = blogs_repository_1.blogsRepository.getAllProducts();
    res.status(200).send(blogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    let blog = blogs_repository_1.blogsRepository.getProductById(+req.params.id);
    if (!blog) {
        res.send(404);
    }
    else {
        res.send(blog);
    }
});
exports.blogsRouter.post('/', (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlogOrErrorMes = blogs_repository_1.blogsRepository.createBlogs(name, description, websiteUrl);
    if (Array.isArray(newBlogOrErrorMes)) {
        res.status(400).send({ 'errorsMessages': newBlogOrErrorMes });
    }
    else {
        res.status(201).send(newBlogOrErrorMes);
    }
});
exports.blogsRouter.delete('/:id', (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteProductById(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.blogsRouter.put('/:id', (req, res) => {
    let isUpdated = blogs_repository_1.blogsRepository.UpdateProductById(+req.params.id, req.body.name);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
