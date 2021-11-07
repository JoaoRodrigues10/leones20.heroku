import db from '../db.js'

import express from 'express'
const Router = express.Router
const app = Router ();



app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_leo_funcionario.findAll({ order: [['id_funcionario', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/', async (req, resp) => {
    try {
        let { nome, cargo, email, senha, telefone } = req.body

        let funcionario = { 
            nm_funcionario: nome,
            ds_cargo: cargo,
            ds_email: email,
            ds_senha: senha,
            ds_telefone: telefone
        }

        let r = await db.infod_leo_funcionario.create(funcionario)
        resp.send(r)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.put('/:id', async (req, resp) => {
    try {
        let { nome, cargo, email, senha, telefone } = req.body

        let r = await db.infod_leo_funcionario.update(
            { 
                nm_funcionario: nome,
                ds_cargo: cargo,
                ds_email: email,
                ds_senha: senha,
                ds_telefone: telefone
            }, 
            {
                where: { id_funcionario: req.params.id }
            }
        )
        resp.sendStatus(200)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.delete('/:id', async (req, resp) => {
    try {

        let r = await db.infod_leo_funcionario.destroy({ where: { id_funcionario: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

export default app;
