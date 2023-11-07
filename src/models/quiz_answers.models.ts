import { ObjectId, Schema, Types, model } from "mongoose";

interface quiz_answers {
  student_id: ObjectId;
  course_id: ObjectId;
  result: number;
}

const quiz_answers_schema = new Schema<quiz_answers>({
  student_id: {
    type: Types.ObjectId,
    ref: "USERS",
  },
  course_id: {
    type: Types.ObjectId,
    ref: "COURSE",
  },
  result: {
    type: Number,
    required: true,
  },
});

export const quiz_answers_model = model<quiz_answers>(
  "QUIZ_ANSWERS",
  quiz_answers_schema
);
