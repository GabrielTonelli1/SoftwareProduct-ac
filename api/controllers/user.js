import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios_sis";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
        "INSERT INTO usuarios_sis(`nm_usuario`, `email`, `telefone`, `dt_nascimento`, `endereco`, `cidade`, `estado_civil`) VALUES(?, ?, ?, ?, ?, ?, ?)";

    const values = [
        req.body.nm_usuario,
        req.body.email,
        req.body.telefone,
        req.body.dt_nascimento,
        req.body.endereco,
        req.body.cidade,
        req.body.estado_civil,
    ];

    db.query(q, values, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso!");
    });
};


export const upDataUser = (req ,res) => {
    const q = 
        "UPDATE usuarios_sis SET `nm_usuario` = ?, `email` = ?, `telefone` = ?, `dt_nascimento` = ?, `endereco` = ?, `cidade` = ?, `estado_civil` = ? WHERE `id` = ?";


    const values = [
        req.body.nm_usuario,
        req.body.email,
        req.body.telefone,
        req.body.dt_nascimento,
        req.body.endereco,
        req.body.cidade,
        req.body.estado_civil,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso!");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios_sis WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso!");
    });
};