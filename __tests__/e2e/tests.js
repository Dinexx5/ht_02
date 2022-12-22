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
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/blogs', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/testing/all-data');
    }));
    it('should return 200 and empty array of blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, []);
    }));
    it('should return 404 for not existing blog', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/100')
            .expect(404);
    }));
    it('should not create blog without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .send({
            name: 'hjjklol',
            description: 'jason stathem',
            websiteUrl: '54353'
        })
            .expect(401);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, []);
    }));
    it('should not create blog with empty name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send({
            name: '',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, []);
    }));
    it('should not create blog with very long name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send({
            name: 'ttttttttttttttttttttttttttttttttt',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, []);
    }));
    it('should not create blog with incorrect Url', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send({
            name: 'tttt',
            description: 'jason stathem',
            websiteUrl: 'ttttttttt'
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, []);
    }));
    let createdBlog = null;
    it('should create video with all correct input', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send({
            name: '67889',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(201);
        createdBlog = expectedResponse.body;
        expect(createdBlog).toEqual({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            websiteUrl: expect.any(String)
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, [createdBlog]);
    }));
    let createdBlog2 = null;
    it('should create 2nd blog with all correct input', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .auth('admin', 'qwerty')
            .send({
            name: '6786jjj',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(201);
        createdBlog2 = expectedResponse.body;
        expect(createdBlog2).toEqual({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            websiteUrl: expect.any(String)
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect(200, [createdBlog, createdBlog2]);
    }));
    it('should not update blog without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/' + createdBlog.id)
            .send({
            name: '67889',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(401);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/' + createdBlog.id)
            .expect(createdBlog);
    }));
    it('should not update blog that do not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/10000')
            .auth('admin', 'qwerty')
            .send({
            name: '67889',
            description: 'jason stathem',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/' + createdBlog.id)
            .expect(createdBlog);
    }));
    it('should update blog with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/' + createdBlog.id)
            .auth('admin', 'qwerty')
            .send({
            name: '67889',
            description: 'i should put it',
            websiteUrl: 'https://www.youtube.com/'
        })
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/' + createdBlog.id)
            .expect(Object.assign(Object.assign({}, createdBlog), { description: 'i should put it' }));
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/' + createdBlog2.id)
            .expect(createdBlog2);
    }));
    it('should not delete blog without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/blogs/' + createdBlog.id)
            .expect(401);
    }));
    it('should delete blog with correct id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/blogs/' + createdBlog.id)
            .auth('admin', 'qwerty')
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs/' + createdBlog.id)
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/blogs')
            .expect([createdBlog2]);
    }));
    //posts
    it('should return 200 and empty array of posts', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, []);
    }));
    it('should return 404 for not existing post', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/100')
            .expect(404);
    }));
    it('should not create post without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .send({
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '1'
        })
            .expect(401);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, []);
    }));
    it('should not create post with empty title', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .auth('admin', 'qwerty')
            .send({
            title: '',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '1'
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, []);
    }));
    it('should not create post with very long title', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .auth('admin', 'qwerty')
            .send({
            title: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '1'
        })
            .expect(400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, []);
    }));
    it('should not create post with not existing blog', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .auth('admin', 'qwerty')
            .send({
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '10'
        })
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, []);
    }));
    let createdPost = null;
    it('should create post with all correct input', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .auth('admin', 'qwerty')
            .send({
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'content',
            blogId: '1'
        })
            .expect(201);
        createdPost = expectedResponse.body;
        expect(createdPost).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            shortDescription: expect.any(String),
            content: expect.any(String),
            blogId: expect.any(String),
            blogName: expect.any(String)
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, [createdPost]);
    }));
    let createdPost2 = null;
    it('should create 2nd post with all correct input', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/posts')
            .auth('admin', 'qwerty')
            .send({
            title: 'title2',
            shortDescription: 'shortDescription2',
            content: 'content2',
            blogId: '1'
        })
            .expect(201);
        createdPost2 = expectedResponse.body;
        expect(createdPost2).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            shortDescription: expect.any(String),
            content: expect.any(String),
            blogId: expect.any(String),
            blogName: expect.any(String)
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect(200, [createdPost, createdPost2]);
    }));
    it('should not update post without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/' + createdPost.id)
            .send({
            title: 'title2',
            shortDescription: 's321321ffffn2',
            content: 'content2',
            blogId: '1'
        })
            .expect(401);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/' + createdPost.id)
            .expect(createdPost);
    }));
    it('should not update post that do not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/10000')
            .auth('admin', 'qwerty')
            .send({
            title: 'title2',
            shortDescription: 's321321ffffn2',
            content: 'content2',
            blogId: '1'
        })
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/' + createdPost.id)
            .expect(createdPost);
    }));
    it('should update post with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/posts/' + createdPost.id)
            .auth('admin', 'qwerty')
            .send({
            title: 'title',
            shortDescription: 'shortDescription',
            content: 'new content',
            blogId: '1'
        })
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/' + createdPost.id)
            .expect(Object.assign(Object.assign({}, createdPost), { content: 'new content' }));
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/' + createdPost2.id)
            .expect(createdPost2);
    }));
    it('should not delete post without authorization', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/posts/' + createdPost.id)
            .expect(401);
    }));
    it('should delete video with correct id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/posts/' + createdPost.id)
            .auth('admin', 'qwerty')
            .expect(204);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts/' + createdPost.id)
            .expect(404);
        yield (0, supertest_1.default)(src_1.app)
            .get('/posts')
            .expect([createdPost2]);
    }));
});
