import { Model, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

interface users {
  name: string;
  last_name: string;
  email: string;
  password: string;
  type_user: string;
  birthdate: Date;
}

const user_schema = new Schema<users>({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type_user: {
    type: String,
    required: true,
    enum: ["TEACHER", "STUDENT"],
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

user_schema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    err ? next(new Error("F")) : (this.password = hash), next();
  });
});

export const user_model = model<users>("USERS", user_schema);
