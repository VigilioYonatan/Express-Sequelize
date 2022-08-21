import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

/*  Inicializar Sequelize */
const db: Sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS, {
    dialect: "mysql",
    host: DB_HOST,
    pool: { max: 5, min: 0, idle: 100000 },
});

/* Conectar Base de datos */
const connectDB = async () => {
    console.log(await db.authenticate());

    try {
        await db.authenticate();
        console.log("Conectandose con la base de datos");
    } catch (error) {
        console.log(error);
    }
};

export { db, connectDB };
