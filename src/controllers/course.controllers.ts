import { Request, Response } from "express";
import path from "path";
import { arrayMsgProps_, msg_ } from "./global.controllers";
import * as cloudinary from "cloudinary";
import { course_model } from "../models/courses.model";
import { VIDEO_UBI } from "../routes";

cloudinary.v2.config({
  cloud_name: "dell1ax0s",
  api_key: "526766135399124",
  api_secret: "0fEm0-bPz9bpUo4iufUGQnLwGus",
});

export const subirCurso = async (req: any, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado un archivo de video." });
    }
    const ubicacionVideo =
      path.join(__dirname, "..", "..") + "\\" + "videos" + "\\";

    req.body.video_url = ubicacionVideo + VIDEO_UBI;

    new course_model(req.body)
      .save()
      .then((data) => {
        msg_("05", "creado", res, data._id, data);
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
  } catch (error) {
    console.error("Error al subir el video a Cloudinary:", error);
    return res
      .status(500)
      .json({ error: "Error al subir el video a Cloudinary." });
  }
};

export const getCursos = async (req: Request, res: Response) => {
  try {
    const COURSE = await course_model
      .find({})
      .populate(["teacher_id", "comments.student_id"]);
    COURSE.length > 0 ? res.json(COURSE) : msg_("PZ", "No hay cursos", res);
  } catch (error) {
    res.json({ msg: error }).status(400);
  }
};

export const getVideoCurso = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const COURSE = await course_model.findOne({ _id }).populate("teacher_id");
    COURSE
      ? res.sendFile(COURSE.video_url)
      : msg_("PZ", "No se encontro el curso", res);
  } catch (error) {
    res.json({ msg: error }).status(400);
  }
};

export const getCursosTeacher = async (req: Request, res: Response) => {
  try {
    const { teacher_id } = req.params;
    const COURSE = await course_model
      .find({ teacher_id })
      .populate(["teacher_id", "comments.student_id"]);
    COURSE.length > 0 ? res.json(COURSE) : msg_("PZ", "No hay cursos", res);
  } catch (error) {
    res.json({ msg: error }).status(400);
  }
};

export const likeCurso = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    let COURSE = await course_model.findOne({ _id });
    if (COURSE) {
      COURSE.like = COURSE.like + 1;
      const COURSE_EDIT = await course_model.findOneAndReplace({ _id }, COURSE);
      msg_("06", "Like", res, COURSE._id, COURSE);
    }
  } catch (error: any) {
    res.json({ msg: error }).status(400);
  }
};

export const DisLikeCurso = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    let COURSE = await course_model.findOne({ _id });
    if (COURSE) {
      COURSE.dislike = COURSE.dislike + 1;
      const COURSE_EDIT = await course_model.findOneAndReplace({ _id }, COURSE);
      msg_("06", "Dislike", res, COURSE._id, COURSE);
    }
  } catch (error: any) {
    res.json({ msg: error }).status(400);
  }
};

export const addCommnet = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.params;
    const { student_id, comment } = req.body;

    const USER = await course_model.findOneAndUpdate(
      { _id: course_id },
      {
        $push: {
          comments: [{ student_id, comment }],
        },
      }
    );
    if (USER) msg_("09", "editado", res);
  } catch (error) {}
};
