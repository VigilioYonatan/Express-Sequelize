import { DataTypes } from "sequelize";
import { db } from "../config/db";

const UsuarioModel = db.define(
    "usuarios",
    {
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        edad: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        createdAt: "Creado",
        updatedAt: "Actualizado",
    }
);

db.sync(/*{foce:true}*/)
    .then(() => {
        console.log("Creado Tabla Usuarios");
    })
    .catch((error) => console.log("No se creo la tabla Usuarios"));

export default UsuarioModel;
