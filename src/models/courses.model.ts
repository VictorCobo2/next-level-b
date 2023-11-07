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
    default:"https://media.discordapp.net/attachments/1038606888977313833/1170934839810195547/logoNextLevel.png?ex=655ad90c&is=6548640c&hm=74dcf0832ad321dbf9210f3b365ba90f357cd5817713e07b05e7d696c4bbe70a&=&width=662&height=662"
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
