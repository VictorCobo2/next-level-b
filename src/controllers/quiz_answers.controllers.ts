import { Request, Response } from "express";
import { user_model } from "../models/users.models";
import { arrayMsgProps_, msg_ } from "./global.controllers";
import { quiz_answers_model } from "../models/quiz_answers.models";

export const guardarResultado = async (req: Request, res: Response) => {
  try {
    new quiz_answers_model(req.body)
      .save()
      .then((data) => {
        msg_("08", "creado", res, data._id, data);
      })
      .catch((error) => {
        if (error.errors) {
          msg_("02", arrayMsgProps_(error.errors), res);
        } else if (error.keyPattern) {
          msg_("03", req.body.email, res);
        } else {
          msg_("PZ", error.message, res);
        }
      });
  } catch (error: any) {
    res.json({ msg: error }).status(400);
  }
};

export const getResultStudent = async (req: Request, res: Response) => {
  try {
    const { student_id, course_id } = req.params;
    const QUIZ_ANSWERS = await quiz_answers_model
      .findOne({ $and: [{ student_id }, { course_id }] })
      .populate(["student_id", "course_id"]);
    QUIZ_ANSWERS
      ? res.json(QUIZ_ANSWERS)
      : msg_("PZ", "No hay respuestas", res);
  } catch (error) {
    console.log("🍑  error", error);
    res.json({ msg: error }).status(400);
  }
};

export const getResultCourse = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.params;
    const QUIZ_ANSWERS = await quiz_answers_model
      .find({ course_id })
      .populate(["student_id", "course_id"]);
    QUIZ_ANSWERS
      ? res.json(QUIZ_ANSWERS)
      : msg_("PZ", "No hay respuestas", res);
  } catch (error) {
    console.log("🍑  error", error);
    res.json({ msg: error }).status(400);
  }
};

export const getResultTeacher = async (req: Request, res: Response) => {
  try {
    const { teacher_id } = req.params;
    const QUIZ_ANSWERS = await quiz_answers_model.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "student_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $lookup: {
          from: "courses", 
          localField: "course_id",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
    ]).match({"course.teacher_id":teacher_id});
    QUIZ_ANSWERS
      ? res.json(QUIZ_ANSWERS)
      : msg_("PZ", "No hay respuestas", res);
  } catch (error) {
    console.log("🍑  error", error);
    res.json({ msg: error }).status(400);
  }
};
