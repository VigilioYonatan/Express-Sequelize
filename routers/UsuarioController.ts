import { Router } from "express";
import { check } from "express-validator";
import { getUsuario, postUsuario } from "../controllers/UsuarioController";
import { validarCampos } from "../middlewares";

const router: Router = Router();

router.get("/", getUsuario);
router.post(
    "/",
    [
        check("nombre", "Este campo es obligatorio").not().isEmpty(),
        check("nombre", "Minimo 3 caracterés ").isLength({
            min: 3,
        }),
        validarCampos,
    ],
    postUsuario
);

export default router;
