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
            ds_telefone: telefone,
            img_funcionario: "https://leonessalaodebeleza.netlify.app/assets/images/fotousu.png"
        }


        if(!isNaN(telefone) == false) {
            return resp.send({ erro: 'No campo Telefone coloque apenas numeros!' })
        }
        
        if(telefone.length > 11) {
            return resp.send({ erro: 'No campo Telefone Coloque Apenas 11 Digitos' })
        }

        let p = await db.infod_leo_funcionario.findOne({where: { ds_email: email } } );
    
        if(p != null ){
            return resp.send({ erro: 'Email já cadastrado' })
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
        let { nome, cargo, email, senha, telefone, imagem } = req.body


        let r = await db.infod_leo_funcionario.update(
            { 
                nm_funcionario: nome,
                ds_cargo: cargo,
                ds_email: email,
                ds_senha: senha,
                ds_telefone: telefone,
                img_funcionario: imagem
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

app.post('/entrar', async (req, resp) => {
    try {
        let { email, cargo, senha } = req.body;

        let r = await db.infod_leo_funcionario.findOne(
            {
                where: {
                    ds_email: email,
                    ds_cargo: cargo,
                    ds_senha: senha
                },
                raw: true
            }
        )
        if (r === null) {
            return resp.send({ erro: 'Credenciais inválidas.' })
        }
        delete r.ds_senha;
        resp.send(r);

    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

export default app;
