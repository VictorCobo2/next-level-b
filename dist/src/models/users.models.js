"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type_user: {
        type: String,
        required: true,
        enum: ["TEACHER", "STUDENT"],
    },
    birthdate: {
        type: Date,
        required: true,
    },
});
user_schema.pre("save", function (next) {
    bcrypt_1.default.hash(this.password, 10, (err, hash) => {
        err ? next(new Error("F")) : (this.password = hash), next();
    });
});
exports.user_model = (0, mongoose_1.model)("USERS", user_schema);
