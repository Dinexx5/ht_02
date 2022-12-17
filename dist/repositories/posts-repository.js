"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const blogs_repository_1 = require("./blogs-repository");
let posts = [];
exports.postsRepository = {
    createPost(title, shortDescription, content, blogId) {
        let foundBlog = blogs_repository_1.blogsRepository.getBlogById(blogId);
        if (foundBlog) {
            const newPost = {
                id: posts.length.toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name
            };
            posts.push(newPost);
            return newPost;
        }
    },
    getPostById(id) {
        let post = posts.find(p => p.id === id);
        return post;
    },
    getAllPosts() {
        return posts;
    },
    deletePostById(id) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        let foundBlog = blogs_repository_1.blogsRepository.getBlogById(blogId);
        let foundPost = posts.find(p => p.id === id);
        if (!foundPost || !foundBlog) {
            return false;
        }
        foundPost.title = title;
        foundPost.shortDescription = shortDescription;
        foundPost.content = content;
        foundPost.blogId = blogId;
        foundPost.blogName = foundBlog.name;
        return true;
    }
};
