import { ObjectId, Schema, Types, model } from "mongoose";

interface asks {
  ask: string;
  answers: [answers];
}
interface answers {
  name: string;
  score: string;
}
interface course {
  title: string;
  description: string;
  teacher_id: ObjectId;
  miniature_url: string;
  video_url: string;
  like: number;
  dislike: number;
  asks: [asks];
  max_points:number
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
    default:"https://cdn.discordapp.com/attachments/1038606888977313833/1172244688368042014/next-level-color-logo.png?ex=655f9cf0&is=654d27f0&hm=0c161d71a3beb4d3a206d0aeb2c037d1af75a05af99129d7406c644c2ea4c7fe&"
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
  asks: {
    type: [],
    required: true,
  },
  max_points: {
    type: Number,
    required: true,
  },
});

export const course_model = model<course>("COURSE", course_schema);
