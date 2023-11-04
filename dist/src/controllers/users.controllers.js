"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioId = exports.getUsuarios = exports.login = exports.putUsuario = exports.register = void 0;
const users_models_1 = require("../models/users.models");
const global_controllers_1 = require("./global.controllers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new users_models_1.user_model(req.body)
            .save()
            .then((data) => {
            (0, global_controllers_1.msg_)("01", "creado", res, data._id, data);
        })
            .catch((error) => {
            if (error.errors) {
                (0, global_controllers_1.msg_)("02", (0, global_controllers_1.arrayMsgProps_)(error.errors), res);
            }
            else if (error.keyPattern) {
                (0, global_controllers_1.msg_)("03", req.body.email, res);
            }
            else {
                (0, global_controllers_1.msg_)("PZ", error.message, res);
            }
        });
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.register = register;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const USER = yield users_models_1.user_model.findOneAndUpdate({ _id }, req.body);
        if (USER)
            (0, global_controllers_1.msg_)("01", "editado", res, USER._id, USER);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.putUsuario = putUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.params;
        const USER = yield users_models_1.user_model.findOne({ email });
        if (USER) {
            const flag_password = bcrypt_1.default.compareSync(password, USER.password);
            if (flag_password) {
                USER.password = "";
                res.json(USER);
            }
            else
                (0, global_controllers_1.msg_)("04", "", res);
        }
        else
            (0, global_controllers_1.msg_)("04", "", res);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.login = login;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const USERS = yield users_models_1.user_model.find({}, { password: 0 });
        USERS.length > 0 ? res.json(USERS) : (0, global_controllers_1.msg_)("PZ", "No hay usuarios", res);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.getUsuarios = getUsuarios;
const getUsuarioId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const USERS = yield users_models_1.user_model.findOne({ _id }, { password: 0 });
        USERS ? res.json(USERS) : (0, global_controllers_1.msg_)("PZ", "No se encontro el usuario", res);
    }
    catch (error) {
        res.json({ msg: error }).status(400);
    }
});
exports.getUsuarioId = getUsuarioId;
