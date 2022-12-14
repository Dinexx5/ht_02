"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const index_1 = require("../index");
exports.postsRouter = (0, express_1.Router)({});
//posts validation
exports.postsRouter.get('/', (req, res) => {
    res.status(200).send(index_1.posts);
});
exports.postsRouter.get('/:id', (req, res) => {
    let post = index_1.posts.find(p => p.id === +req.params.id);
    if (!post) {
        res.send(404);
    }
    else {
        res.send(post);
    }
});
