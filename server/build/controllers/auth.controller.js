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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const invite_model_1 = __importDefault(require("../models/invite.model"));
const AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // See if entered invite is found 
            const invite = yield invite_model_1.default.findOne({
                code: req.body.invite
            }).exec();
            // If not, just error out
            if (!invite)
                return res.status(500).json({ "message": "Invalid invite.." });
            // If valid invite, make account
            bcrypt_1.default.hash(req.body.password, 16, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    res.status(500).json({ "message": "Could not create new user :(" });
                req.body.password = hash;
                const result = yield user_model_1.default.create(req.body);
                // Check if user was created and delete invite
                if (result) {
                    res.status(200).json({ result });
                    yield invite_model_1.default.findOneAndDelete({
                        code: req.body.invite
                    }).exec();
                }
            }));
        }
        catch (error) {
            res.status(500).json({ "message": "Could not create new user :(" });
        }
    }),
    authenticate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const secret = process.env.SECRET;
            const user = yield user_model_1.default.findOne({
                username: req.body.username
            }).exec();
            bcrypt_1.default.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const body = { sub: user.id, username: user.username };
                    const opts = { "expiresIn": "1h" };
                    const token = jsonwebtoken_1.default.sign(body, secret, opts);
                    res.status(200).json({ "token": token });
                }
                else {
                    res.status(401).json({ "message": "Wrong Credentials!" });
                }
            });
        }
        catch (error) {
            res.status(500).json({ "message": "Could not create new user :(" });
        }
    })
};
exports.default = AuthController;
