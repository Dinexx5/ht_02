"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [];
exports.blogsRepository = {
    createBlogs(name, description, websiteUrl) {
        const newBlog = {
            id: blogs.length,
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    getBlogById(id) {
        let blog = blogs.find(b => b.id === id);
        return blog;
    },
    getAllBlogs() {
        return blogs;
    },
    deleteBlogById(id) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        let foundBlog = blogs.find(b => b.id === id);
        if (!foundBlog) {
            return false;
        }
        foundBlog.name = name;
        foundBlog.description = description;
        foundBlog.websiteUrl = websiteUrl;
        return true;
    }
};
