"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = exports.blogs = void 0;
exports.blogs = [];
exports.blogsRepository = {
    createBlogs(name, description, websiteUrl) {
        const newBlog = {
            id: exports.blogs.length,
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
    getBlogById(id) {
        let blog = exports.blogs.find(b => b.id === id);
        return blog;
    },
    getAllBlogs() {
        return exports.blogs;
    },
    deleteBlogById(id) {
        for (let i = 0; i < exports.blogs.length; i++) {
            if (exports.blogs[i].id === id) {
                exports.blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        let foundBlog = exports.blogs.find(b => b.id === id);
        if (!foundBlog) {
            return false;
        }
        foundBlog.name = name;
        foundBlog.description = description;
        foundBlog.websiteUrl = websiteUrl;
        return true;
    }
};
