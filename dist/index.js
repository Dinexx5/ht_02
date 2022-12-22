"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_router_1 = require("./routes/posts-router");
const blogs_router_1 = require("./routes/blogs-router");
const testing_router_1 = require("./routes/testing-router");
const db_1 = require("./repositories/db");
exports.app = (0, express_1.default)();
const port = 3001;
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/testing', testing_router_1.testingRouter);
//app start
const appStart = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
appStart();
