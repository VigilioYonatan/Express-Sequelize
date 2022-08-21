import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { db } from "../config/db";
import sequelize from 'sequelize';
import * from 'express';


const rawQuery =async(req,res)=>{
    // personalizado 
    const users = await db.query('select * from usuarios',{type:QueryTypes.SELECT})
    // const users = await db.query('select * from usuarios where gender =:gender',
    // {
        // type:QueryTypes.SELECT,
        // replacements:
            // {gender:'male'}
        // })
        // bind :{gender:'male'} // es igual que replacemnts pero es $gender
    // eso regresa ell array de usuarios 
}

const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await UsuarioModel.findAll({
        attributes: [
            "nombre",
            ["email", "newEmailName"],
            // [Sequelize.fn("Count", Sequelize.col("email")), "emailCount"],
            // [Sequelize.fn("Concat", Sequelize.col("email"),'iD'), "emailCount"],
        ],
    });
    // .count  cuenta
    const countUsuarios = await UsuarioModel.count();
    // const usuarios = await UsuarioModel.findAll({ attributes: ["nombre",["email":"nuevoemailnombtr"]] });
    // .findAll({where:{id:1 }})
    const USERS = await UsuarioModel.findAll({
        attributes: {
            exclude: ["id"], // traeme todo menos
            include: [
                [
                    Sequelize.fn("CONCAT", Sequelize.col("nombre"), "xd"),
                    "nombreAlias",
                ],
            ],
        },
    });
    //findAndCount -> busca y cuenta-> tambien tiene los parametros
    const [data, created] = await UsuarioModel.findAll({
        //created. debe devolver true o false si se agregó
        where: {
            // id: 2,
            // id: {
            //     [Op.eq]: 2,
            // },
            email: {
                [Op.like]: "%mail3%",
            },
            // [Op.and]: [{ authorId: 12 }, { status: "active" }],
        },
        group: ["email", "name"],
        order: ["name", "DESC"],
        limit: 2,
        offset: 1, // SKIP
    });

    res.json({
        msg: "getUsuarios",
        usuariosWhere,
    });
};
const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuarioId = await UsuarioModel.findByPk(id);

    res.json({
        msg: "getUsuarioBYID",
        usuarioId,
    });
};
const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const existeEmail = await UsuarioModel.findOne({
        where: {
            email: body.email,
        },
    });
    // await UsuarioModel.findOne({
    //     attributes:[]
    // })

    if (existeEmail) {
        return res.status(400).json({
            msg: "Ya existe este email",
        });
    }
    try {
        // build && create lo mismo . create no necesita .save() pero si hace un modificaion pos si lleva
        const usuario = await UsuarioModel.create(body);
        // const usuario = await UsuarioModel.create(body, { fields: ["nombre"] }); // insertame solo estos valores ÚTIL
        //
        // await UsuarioModel.bulkCreate([{name:'erer',email:''},{name:'erer',email:'email'}]) //crea varias tablas a la vez
        // usuario.name  un mmidleware se diria
        await usuario.save();

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};
const putUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const usuarioUpdate = await UsuarioModel.update(body, {
        where: {
            id: 1, // el where
        },
    });

    return res.json(usuarioUpdate);

    // try {
    //     const usuario = await UsuarioModel.findByPk(id);
    //     if (!usuario) {
    //         return res.status(404).json({
    //             msg: "No existe el usuario con el id",
    //             id,
    //         });
    //     }
    // await usuario.update(body);
    //
    //     res.json(usuario);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         msg: "Hable con el administrador",
    //     });
    // }
};
const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await UsuarioModel.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "No existe el usuario con el id",
                id,
            });
        }

        await usuario.update({ estado: false });
        // await usuario.destroy();
        // await usuario.destroy({where:{id:2}});
        // await usuario.destroy({truncate:true}) eliminar todas columnas
        res.json({
            msg: "Usuario eliminado",
            id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

export { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario };
.