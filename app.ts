import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UsuarioRouter } from "./routers";
import { connectDB } from "./config/db";
dotenv.config();
/* Iniciar applicacion */
const app: Application = express();

/* Middlewares */
connectDB();
app.use(express.json());
app.use(cors());

/* Routers */
app.use("/api/usuario", UsuarioRouter);

/* PUERTO */
const PORT = process.env.PORT;
/* LISTEN SERVER */
app.listen(PORT, () => {
    console.log(`Corriendo servidor en el puerto ${PORT}`);
});
