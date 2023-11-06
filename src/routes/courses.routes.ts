import { Router } from "express";
import multer from 'multer';
import { DisLikeCurso, getCursos, getCursosTeacher, likeCurso, subirCurso } from "../controllers/course.controllers";

export const COURSE_ROUTE = Router();
export let VIDEO_UBI = ""

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './videos');
    },
    filename: (req, file, cb) => {
      VIDEO_UBI = `${file.fieldname + '-' + Date.now() + file.originalname}`
      cb(null, VIDEO_UBI);
    },
  });
  
const upload = multer({ storage: storage });


COURSE_ROUTE.post("/subir-curso", upload.single('video'), subirCurso);
COURSE_ROUTE.get("/courses", getCursos);
COURSE_ROUTE.get("/courses-teacher/:teacher_id", getCursosTeacher);
COURSE_ROUTE.get("/like/:_id", likeCurso);
COURSE_ROUTE.get("/dislike/:_id", DisLikeCurso);

