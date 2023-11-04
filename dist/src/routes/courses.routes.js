"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COURSE_ROUTE = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const course_controllers_1 = require("../controllers/course.controllers");
exports.COURSE_ROUTE = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './videos');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.COURSE_ROUTE.post("/subir-curso", upload.single('video'), course_controllers_1.subirCurso);
exports.COURSE_ROUTE.get("/courses", course_controllers_1.getCursos);
exports.COURSE_ROUTE.get("/courses-teacher/:teacher_id", course_controllers_1.getCursosTeacher);
exports.COURSE_ROUTE.get("/like/:_id", course_controllers_1.likeCurso);
exports.COURSE_ROUTE.get("/dislike/:_id", course_controllers_1.DisLikeCurso);
