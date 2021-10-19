import db from './db.js';
import express from 'express'
import cors from 'cors'
import enviarEmail from './email.js'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/cliente', async (req, resp) => {
    try {

        let r = await db.infod_leo_cliente.findAll({ order: [['id_cliente', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/cliente', async (req, resp) => {
    try {
        let { nome, email, senha, imagem, telefone } = req.body

        let cliente = { 
            nm_nome: nome,
            ds_email: email,
            ds_senha: senha,
            img_cliente: imagem,
            ds_telefone: telefone
        }

        let r = await db.infod_leo_cliente.create(cliente)
        resp.send(r)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.put('/cliente/:id', async (req, resp) => {
    try {
        let { nome, email, senha, imagem, telefone } = req.body


        let r = await db.infod_leo_cliente.update(
            { 
                nm_nome: nome,
                ds_email: email,
                ds_senha: senha,
                img_cliente: imagem,
                ds_telefone: telefone
            }, 
            {
                where: { id_cliente: req.params.id }
            }
        )
        resp.sendStatus(200)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.delete('/cliente/:id', async (req, resp) => {
    try {

        let r = await db.infod_leo_cliente.destroy({ where: { id_cliente: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})




app.get('/funcionario', async (req, resp) => {
    try {
        let r = await db.infod_leo_funcionario.findAll({ order: [['id_funcionario', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/funcionario', async (req, resp) => {
    try {
        let { nome, cargo, email, senha, telefone } = req.body

        let funcionario = { 
            nm_nome: nome,
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

app.put('/funcionario/:id', async (req, resp) => {
    try {
        let { nome, cargo, email, senha, telefone } = req.body


        let r = await db.infod_leo_funcionario.update(
            { 
                nm_nome: nome,
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

app.delete('/funcionario/:id', async (req, resp) => {
    try {

        let r = await db.infod_leo_funcionario.destroy({ where: { id_funcionario: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})





app.get('/servicos', async (req, resp) => {
    try {

        let r = await db.infod_leo_servico.findAll({ order: [['id_servico', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/servicos', async (req, resp) => {
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

app.put('/servicos/:id', async (req, resp) => {
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

app.delete('/servicos/:id', async (req, resp) => {
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



app.get('/agendamento', async (req, resp) => {
    try {
        let r = await db.infod_leo_agendamento.findAll({ order: [['id_agendamento', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.post('/agendamento', async (req, resp) => {
    try {
        let { idfuncionario, idcliente, idservico, data, situacao} = req.body

        let agendamentos = {
            id_funcionario: idfuncionario,
            id_cliente: idcliente,
            id_servico: idservico,
            dt_agendamento: data,
            tp_situacao: situacao
            
        }

        let r = await db.infod_leo_agendamento.create(agendamentos)
        resp.send(r)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

app.put('/agendamento/:id', async (req, resp) => {
    try {

        let { idfuncionario, idcliente, idservico, data, situacao} = req.body

        let r = await db.infod_leo_agendamento.update(
            {
                id_funcionario: idfuncionario,
                id_cliente: idcliente,
                id_servico: idservico,
                dt_agendamento: data,
                tp_situacao: situacao
            }, 
            {
                where: { id_agendamento: req.params.id }
            }
        )
        resp.sendStatus(200)

    }catch (e){
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
}) 

app.delete('/agendamento/:id', async (req, resp) => {
    try {

        let r = await db.infod_leo_agendamento.destroy({ where: { id_agendamento: req.params.id} })
        resp.sendStatus(200)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})







app.post('/enviar', async (req, resp) => {
    try {
        const response = await enviarEmail(req.body.para, req.body.assunto, req.body.mensagem);

        resp.send(response);

    } catch(e) {
        resp.send(e)
    }
})

app.get('/buscarbairro', async (req, resp) => {
    try{
        const api_key = 'b866c3722fa645f9acb1da4674663672';
        const { lat, lon } = req.query;

        let r = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${api_key}`);
        resp.send(r.data);

    } catch(e) {
        resp.send(e);
    }
})




app.post('/login', async (req, resp) => {
    try {
        const loginusu = await db.infod_leo_cliente.findOne({ where: { ds_email: req.body.email, ds_senha: req.body.senha } })
        if (!loginusu) {
            resp.send({ erro: 'Credenciais inválidas' })
        } else {
            resp.sendStatus(200);
        }

    } catch(e) {
        resp.send( {erro: e.toString() } );
        
    }
})

app.post('/esqueciASenha', async (req, resp) => {
    try {
        const loginusu = await db.infod_leo_cliente.findOne({ where: { ds_email: req.body.email } })
        if (!loginusu) {
            resp.send({ erro: 'E-mail inválido' })
        } 

        let codigoDeVerificacao = geradorDeNumeros(100000, 999999)

        // await db.infod_leo_cliente.uptade({
        //     ds_codigo_verificacao: codigoDeVerificacao
        // }, {
        //     where: { id_cliente: longinusu.id_cliente }
        // }
        // )
        

        enviarEmail(loginusu.ds_email, 'Aqui está o código para recuperação da sua Conta', `
        
        <h3> Use este código para redifinir sua senha </h3>
        <p> Seu código de verificação é: <b> ${codigoDeVerificacao} </b> </p>
        `
        )

        resp.sendStatus(200)


    } catch(e) {
        resp.send( {erro: e.toString() } );
        
    }
})

app.post('/login', async (req, resp) => {
    try {
        const loginusu = await db.infod_leo_cliente.findOne({ where: { ds_email: req.body.email, ds_senha: req.body.senha } })
        if (!loginusu) {
            resp.send({ erro: 'Credenciais inválidas' })
        } else {
            resp.sendStatus(200);
        }

    } catch(e) {
        resp.send( {erro: e.toString() } );
        
    }
})

app.post('/login', async (req, resp) => {
    try {
        const loginusu = await db.infod_leo_cliente.findOne({ where: { ds_email: req.body.email, ds_senha: req.body.senha } })
        if (!loginusu) {
            resp.send({ erro: 'Credenciais inválidas' })
        } else {
            resp.sendStatus(200);
        }

    } catch(e) {
        resp.send( {erro: e.toString() } );
        
    }
})



function geradorDeNumeros(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


app.listen(process.env.PORT,
    x => console.log(`>> Server up at port ${process.env.PORT}`))