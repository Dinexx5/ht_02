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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.postsCollection = exports.blogsCollection = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = "mongodb+srv://Dinexx5:3231810dimasD@cluster0.ptoddig.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(mongoUri);
const db = client.db("youtube");
exports.blogsCollection = db.collection("blogs");
exports.postsCollection = db.collection("posts");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect client tot the server
            yield client.connect();
            // Establish and verify connection
            yield client.db("youtube").command({ ping: 1 });
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            console.log("Can not connect to mongo db");
            //Ensures that client will close after finish/error
            yield client.close();
        }
    });
}
exports.runDb = runDb;
