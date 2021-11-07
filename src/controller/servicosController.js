import db from '../db.js'

import express from 'express'
const Router = express.Router
const app = Router ();


app.get('/', async (req, resp) => {
    try {

        let r = await db.infod_leo_servico.findAll({ order: [['id_servico', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/', async (req, resp) => {
    try {
        let { tipo, nome, descricao, valor } = req.body

        let servicoss = {
            tp_servico: tipo,
            nm_servico: nome,
            ds_servico: descricao,
            vl_servico: valor
        }

        let r = await db.infod_leo_servico.create(servicoss)
        resp.send(r)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.put('/:id', async (req, resp) => {
    try {
        let { tipo, nome, descricao, valor } = req.body

        

        let r = await db.infod_leo_servico.update(
            { 
                tp_servico: tipo,
                nm_servico: nome,
                ds_servico: descricao,
                vl_servico: valor
            }, 
            {
                where: { id_servico: req.params.id }
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

        let r = await db.infod_leo_servico.destroy({ where: { id_servico: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.get('/servicoimg', async (req, resp) => {
    try {

        let r = await db.infod_leo_servico_imagem.findAll({ order: [['id_imagem', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/servicoimg', async (req, resp) => {
    try {
        let { idservico, imgservico } = req.body

        let servicoimagens = {
            id_servico: idservico,
            img_servico: imgservico
        }

        let r = await db.infod_leo_servico_imagem.create(servicoimagens)
        resp.send(r)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.put('/servicoimg/:id', async (req, resp) => {
    try {
        let { idservico, imgservico } = req.body

        let r = await db.infod_leo_servico_imagem.update(
            {
                id_servico: idservico,
                img_servico: imgservico
            }, 
            {
                where: { id_imagem: req.params.id }
            }
        )
        resp.sendStatus(200)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.delete('/servicoimg/:id', async (req, resp) => {
    try {

        let r = await db.infod_leo_servico_imagem.destroy({ where: { id_imagem: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

export default app;
