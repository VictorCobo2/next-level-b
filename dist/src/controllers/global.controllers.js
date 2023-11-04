"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMsgProps_ = exports.findMsg_ = exports.msg_ = void 0;
const arrayProps_ = (error) => {
    let final_array = [];
    for (const [prop, val] of Object.entries(error)) {
        let { kind, value } = val;
        final_array.push({ prop, kind, value });
    }
    return final_array;
};
const msg_ = (code, campo, res, _id, data) => {
    (0, exports.findMsg_)(code, campo, res, _id, data);
};
exports.msg_ = msg_;
const findMsg_ = (code, campo, res, _id, data) => {
    let msg;
    const MSG = [
        { code: "01", msg: `Usuario ${campo} correctamente`, tipo: "success", _id, data },
        { code: "02", msg: campo, tipo: "info" },
        { code: "03", msg: `¡El correo ${campo}, ya esta registrado!`, tipo: "info" },
        { code: "04", msg: `Usuario o contraseña incorrecta`, tipo: "info" },
        { code: "05", msg: `Curso creado correctamente`, tipo: "success", _id, data },
        { code: "06", msg: `${campo} agregado correctamente`, tipo: "success", _id, data },
        { code: "PZ", msg: `${campo}`, tipo: "info" }
    ];
    const RES = MSG.find((e) => e.code == code);
    return RES ? res.json(RES) : msg;
};
exports.findMsg_ = findMsg_;
const arrayMsgProps_ = (error) => {
    let msgErrors = arrayProps_(error);
    return msgErrors.map((val) => {
        console.log(val.prop);
        return {
            prop: val.prop,
            msg: val.kind == "required"
                ? `Dato requerido.\n`
                : `Dato (${val.value}) inválido.\n`,
        };
    });
};
exports.arrayMsgProps_ = arrayMsgProps_;
