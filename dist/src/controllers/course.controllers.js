"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.DisLikeCurso = exports.likeCurso = exports.getCursosTeacher = exports.getCursos = exports.subirCurso = void 0;
const global_controllers_1 = require("./global.controllers");
const cloudinary = __importStar(require("cloudinary"));
const courses_model_1 = require("../models/courses.model");
cloudinary.v2.config({
    cloud_name: "dell1ax0s",
    api_key: "526766135399124",
    api_secret: "0fEm0-bPz9bpUo4iufUGQnLwGus",
});
const subirCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res
                .status(400)
                .json({ error: "No se ha proporcionado un archivo de video." });
        }
        const resultado = yield cloudinary.v2.uploader.upload(file.path, {
            resource_type: "video",
        });
        req.body.video_url = resultado.url;
        new courses_model_1.course_model(req.body)
            .save()
            .then((data) => {
            (0, global_controllers_1.msg_)("05", "creado", res, data._id, data);
        })
            .catch((error) => {
            if (error.errors) {
                (0, global_controllers_1.msg_)("02", (0, global_controllers_1.arrayMsgProps_)(error.errors), res);
            }
            else if (error.keyPattern) {
                (0, global_controllers_1.msg_)("03", req.body.email, res);
            }
            else {
                (0, global_controllers_1.msg_)("PZ", error.message, res);
            }
        });
    }
    catch (error) {
        console.error("Error al subir el video a Cloudinary:", error);
        return res
            .status(500)
            .json({ error: "Error al subir el video a Cloudinary." });
    }
});
exports.subirCurso = subirCurso;
const getCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const COURSE = yield courses_model_1.course_model.find({}).populate("teacher_id");
        COURSE.length > 0 ? res.json(COURSE) : (0, global_controllers_1.msg_)("PZ", "No hay cursos", res);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.getCursos = getCursos;
const getCursosTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacher_id } = req.params;
        const COURSE = yield courses_model_1.course_model.find({ teacher_id }).populate("teacher_id");
        COURSE.length > 0 ? res.json(COURSE) : (0, global_controllers_1.msg_)("PZ", "No hay cursos", res);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.getCursosTeacher = getCursosTeacher;
const likeCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        let COURSE = yield courses_model_1.course_model.findOne({ _id });
        if (COURSE) {
            COURSE.like = COURSE.like + 1;
            const COURSE_EDIT = yield courses_model_1.course_model.findOneAndReplace({ _id }, COURSE);
            (0, global_controllers_1.msg_)("06", "Like", res, COURSE._id, COURSE);
        }
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.likeCurso = likeCurso;
const DisLikeCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        let COURSE = yield courses_model_1.course_model.findOne({ _id });
        if (COURSE) {
            if (COURSE.like > 0)
                COURSE.like = COURSE.like - 1;
            const COURSE_EDIT = yield courses_model_1.course_model.findOneAndReplace({ _id }, COURSE);
            (0, global_controllers_1.msg_)("06", "Dislike", res, COURSE._id, COURSE);
        }
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.DisLikeCurso = DisLikeCurso;
