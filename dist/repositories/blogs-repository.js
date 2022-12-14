"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [];
exports.blogsRepository = {
    createBlogs(name, description, websiteUrl) {
        let errorsMessages = [];
        if (!name || typeof name !== 'string' || name.length > 15 || !name.trim()) {
            errorsMessages.push({
                message: "Incorrect name",
                field: "name"
            });
        }
        if (!description || typeof description !== 'string' || description.length > 500 || !description.trim()) {
            errorsMessages.push({
                message: "Incorrect description",
                field: "description"
            });
        }
        if (!websiteUrl || typeof websiteUrl !== 'string' || websiteUrl.length > 100 || !websiteUrl.trim()) {
            errorsMessages.push({
                message: "Incorrect websiteUrl",
                field: "websiteUrl"
            });
        }
        if (errorsMessages.length) {
            return (errorsMessages);
        }
        const newBlog = {
            id: blogs.length,
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    getProductById(id) {
        let blog = blogs.find(b => b.id === id);
        return blog;
    },
    getAllProducts() {
        return blogs;
    },
    deleteProductById(id) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    UpdateProductById(id, name) {
        let foundBlog = blogs.find(b => b.id === id);
        let errorsMessages = [];
        if (!foundBlog) {
            return false;
        }
        foundBlog.name = name;
        return true;
    }
};
