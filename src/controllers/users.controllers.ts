import { Request, Response } from "express";
import { user_model } from "../models/users.models";
import { arrayMsgProps_, msg_ } from "./global.controllers";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    new user_model(req.body)
      .save()
      .then((data) => {
        msg_("01", "creado", res, data._id, data);
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

export const putUsuario = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const USER = await user_model.findOneAndUpdate({ _id }, req.body);
    if (USER) msg_("01", "editado", res, USER._id, USER);
  } catch (error: any) {
    res.json({ msg: error }).status(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.params;
    const USER = await user_model.findOne({ email });
    if (USER) {
      const flag_password = bcrypt.compareSync(password, USER.password);
      if (flag_password) {
        USER.password = "";
        res.json(USER);
      } else msg_("04", "", res);
    } else msg_("04", "", res);
  } catch (error: any) {
    res.json({ msg: error }).status(400);
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const USERS = await user_model.find({}, { password: 0 });
    USERS.length > 0 ? res.json(USERS) : msg_("PZ", "No hay usuarios", res);
  } catch (error) {
    res.json({ msg: error }).status(400);
  }
};

export const getUsuarioId = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const USERS = await user_model.findOne({ _id }, { password: 0 });
    USERS ? res.json(USERS) : msg_("PZ", "No se encontro el usuario", res);
  } catch (error) {
    res.json({ msg: error }).status(400);
  }
};
