import { Router } from "express";
import { getUsuarioId, getUsuarios, login, putUsuario, register } from "../controllers/users.controllers";

export const USERS_ROUTES = Router();

USERS_ROUTES.get("/users", getUsuarios);
USERS_ROUTES.get("/user/:_id", getUsuarioId);
USERS_ROUTES.post("/register", register);
USERS_ROUTES.put("/put/:_id", putUsuario);
USERS_ROUTES.get("/login/:email/:password", login);
