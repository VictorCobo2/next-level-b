import { Router } from "express";
import { getResultCourse, getResultStudent, guardarResultado } from "../controllers/quiz_answers.controllers";

export const QUIZ_ANSWERS_ROUTES = Router();

QUIZ_ANSWERS_ROUTES.post("/quiz_answers", guardarResultado);
QUIZ_ANSWERS_ROUTES.get("/result-quiz/:student_id/:course_id", getResultStudent);
QUIZ_ANSWERS_ROUTES.get("/result-quiz-course/:course_id", getResultCourse);