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
const post_model_1 = require("../models/post.model");
const PostsController = {
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const limit = 25;
            const offset = req.query["page"];
            const result = yield post_model_1.Post.find({}, "id title")
                .skip(offset * limit)
                .limit(limit);
            if (result)
                return res.status(200).json(result);
            return res.status(500).json({ "error": "could not find any docs" });
        }
        catch (error) {
            res.status(500).json({ "message": "could not find any docs" });
        }
    }),
    findOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield post_model_1.Post.findById(req.params.id);
            if (result)
                return res.status(200).json(result);
            return res.status(500).json({ "error": "could not find the doc" });
        }
        catch (error) {
            res.status(500).json({ "message": "could not find the doc" });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = new post_model_1.Post({
                "title": req.body.title,
                "body": req.body.body
            });
            const result = yield newPost.save();
            if (result)
                return res.status(200).json(result);
            return res.status(500).json({ "error": "could not save doc!" });
        }
        catch (error) {
            res.status(500).json({ "message": "could not save doc" });
        }
    }),
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comment = new post_model_1.Comment({ body: req.body.body });
            const post = yield post_model_1.Post.findById(req.params.id, "comments").exec();
            if (!post)
                res.status(500).json("could not add comment");
            post.comments.push(comment);
            const result = yield post.save();
            if (result)
                return res.status(200).json(result);
            return res.status(500).json({ "error": "could not create comment" });
        }
        catch (error) {
            res.status(500).json({ "message": "could not create comment" });
        }
    })
};
exports.default = PostsController;
