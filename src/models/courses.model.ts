import mongoose, { ObjectId, Schema, Types, model } from "mongoose";

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
  max_points: number;
  comments: [];
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
    default:
      "https://cdn.discordapp.com/attachments/1038606888977313833/1172248964498722917/logoAzul.png?ex=655fa0ec&is=654d2bec&hm=bcd8a2906ffb977a03bc68db56c6880c95ca9a3e5fcd7f35b22b75a31a02023d&",
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
  comments: {
    type: [
      {
        student_id: {
          type: mongoose.Types.ObjectId,
          ref: "USERS",
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
  },
});

export const course_model = model<course>("COURSE", course_schema);
