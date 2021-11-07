import db from '../db.js'

import express from 'express'
const Router = express.Router
const app = Router ();


app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_leo_cliente.findAll({ order: [['id_cliente', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/', async (req, resp) => {
    try {
        let { nome, email, senha, imagem, telefone } = req.body

        if (nome === "" && email === "" && telefone === "" && senha === "") {
            return resp.send({ erro: 'Preencha todos os campos!' });
        }
        if(!isNaN(telefone) == false) {
            return resp.send({ erro: 'No campo Telefone coloque apenas numeros!' })
        }
        if(telefone.length <= 10) {
            return resp.send({ erro: 'No campo Telefone Coloque 11 Digitos!' })
        }
        if(telefone.length > 11) {
            return resp.send({ erro: 'No campo Telefone Coloque Apenas 11 Digitos' })
        }

        let cliente = { 
            nm_cliente: nome,
            ds_email: email,
            ds_senha: senha,
            img_cliente: imagem,
            ds_telefone: telefone
        }

        let r = await db.infod_leo_cliente.create(cliente)
        resp.send(r)

    }catch (e){
        resp.send({ erro: e.toString() })
        console.log(e.toString());
    }
})

app.put('/:id', async (req, resp) => {
    try {
        let { nome, email, senha, telefone, imagem } = req.body

        const {id} = req.params;
        let r = await db.infod_leo_cliente.update(
            { 
                nm_cliente: nome,
                ds_email: email,
                ds_senha: senha,
                ds_telefone: telefone,
                img_cliente: imagem
            }, 
            {
                where: { id_cliente: id }
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

        const {id} = req.params;
        let r = await db.infod_leo_cliente.destroy({ where: { id_cliente: id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

export default app;
