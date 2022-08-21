import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";

const getUsuario = (req: Request, res: Response) => {
    const usuario = UsuarioModel.findAll();

    res.json(usuario);
};
const postUsuario = (req: Request, res: Response) => {
    const user = req.body;
    res.json(user);
};

export { getUsuario, postUsuario };
