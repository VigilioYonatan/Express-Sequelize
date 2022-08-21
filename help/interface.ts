import { Model } from "sequelize";
export interface Usuario {
    id?: string;
    nombre: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UsuarioModel extends Model<Usuario> {}
