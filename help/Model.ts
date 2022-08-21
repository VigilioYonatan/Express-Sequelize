import { DataTypes } from "sequelize";
import { db } from "../config/db";
import { UsuarioModel } from "./interface";

const UsuarioModel = db.define<UsuarioModel>(
    "Usuario",
    {
        nombre: {
            type: DataTypes.STRING, // tipo de dato
            allowNull: true, // nulo
            defaultValue: "hola", // valor por defecto
        },
        email: {
            type: DataTypes.STRING,
            // set(value) {
            //     this.setDataValue("email", value + "@gmail.com");
            // },
        },
    },
    {
        //tableName: "users", // ponerle nombre a la tabla
        timestamps: true,
        // timestamps: false, si no quieres que te agregue los timestamps
        // updatedAt:false// uodatedAt = 'fecha creacion' -> renombrar
        // createAt:false
        // engine:'MYSAM' //cambiar engine por decto el
    }
);

db.sync(/*{force:true}*/) //elimina tabla y crea de nuevo
    .then(() => {
        console.log("yes");
    })
    .catch((error) => console.log("error hermano"));
export default UsuarioModel;
