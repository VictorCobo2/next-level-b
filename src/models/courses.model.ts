import { ObjectId, Schema, Types, model } from "mongoose";

interface course {
  title: string;
  description: string;
  teacher_id: ObjectId;
  miniature_url: string;
  video_url: string;
  like: number;
  dislike: number;
}

const course_schema = new Schema<course>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: Types.ObjectId,
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

export const course_model = model<course>("COURSE", course_schema);
