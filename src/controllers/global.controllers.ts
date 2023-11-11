import { Request, Response } from "express";
import { Types } from "mongoose";
import * as cloudinary from 'cloudinary';


const arrayProps_ = (error: Object) => {
  let final_array = [];
  for (const [prop, val] of Object.entries(error)) {
    let { kind, value } = val;
    final_array.push({ prop, kind, value });
  }
  return final_array;
};

export const msg_ = (
  code: String,
  campo: any,
  res: Response,
  _id?: Types.ObjectId,
  data?: any
) => {
  findMsg_(code, campo, res, _id, data);
};

export const findMsg_ = (
  code: String,
  campo: any,
  res: Response,
  _id?: Types.ObjectId,
  data?: any
) => {
  let msg;
  const MSG = [
    { code: "01", msg: `Usuario ${campo} correctamente`, tipo: "success", _id, data },
    { code: "02", msg: campo, tipo: "info" },
    { code: "03", msg: `¡El correo ${campo}, ya esta registrado!`, tipo: "info" },
    { code: "04", msg: `Usuario o contraseña incorrecta`, tipo: "info" },
    { code: "05", msg: `Curso creado correctamente`, tipo: "success", _id, data },
    { code: "06", msg: `${campo} agregado correctamente`, tipo: "success", _id, data },
    { code: "07", msg: `Cuestionario creado correctamente`, tipo: "success", _id, data },
    { code: "08", msg: `Respuesta guardada correctamente`, tipo: "success", _id, data },
    { code: "09", msg: `Comentario agragado correctamente`, tipo: "success"},
    { code: "PZ", msg: `${campo}`, tipo: "info" }
  ];
  const RES = MSG.find((e) => e.code == code);
  return RES ? res.json(RES) : msg;
};

export const arrayMsgProps_ = (error: Object) => {
  let msgErrors = arrayProps_(error);
  return msgErrors.map((val) => {
    console.log(val.prop);
    return {
      prop: val.prop,
      msg:
        val.kind == "required"
          ? `Dato requerido.\n`
          : `Dato (${val.value}) inválido.\n`,
    };
  });
};

