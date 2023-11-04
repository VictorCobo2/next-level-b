"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.course_model = void 0;
const mongoose_1 = require("mongoose");
const course_schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: mongoose_1.Types.ObjectId,
        ref: "USERS",
    },
    miniature_url: {
        type: String,
        // required: true,
    },
    video_url: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0,
    },
});
exports.course_model = (0, mongoose_1.model)("COURSE", course_schema);
