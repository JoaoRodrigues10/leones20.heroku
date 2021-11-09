import db from './db.js';
import express from 'express'
import cors from 'cors'
import enviarEmail from './email.js'
import multer from 'multer'
import path from 'path'



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
        let { nome, email, senha,  telefone } = req.body

        let cliente = { 
            nm_cliente: nome,
            ds_email: email,
            ds_senha: senha,
            img_cliente: "https://leonessalaodebeleza.netlify.app/assets/images/fotousu.png",
            ds_telefone: telefone
        }

        
            if(!isNaN(telefone) == false) {
                return resp.send({ erro: 'No campo Telefone coloque apenas numeros!' })
            }
            
            if(telefone.length > 11) {
                return resp.send({ erro: 'No campo Telefone Coloque Apenas 11 Digitos' })
            }

            let p = await db.infod_leo_cliente.findOne({where: { ds_email: email } } );
        
            if(p != null ){
                return resp.send({ erro: 'Email já cadastrado' })
             }

        let r = await db.infod_leo_cliente.create(cliente)
        resp.send(r)

    }catch (e){
        resp.send({ erro: e.toString() })
        console.log(e.toString());
    }
})

app.put('/cliente/:id', async (req, resp) => {
    try {
        let { nome, email, senha, telefone, imagem } = req.body

        let r = await db.infod_leo_cliente.update(
            { 
                nm_cliente: nome,
                ds_email: email,
                ds_senha: senha,
                ds_telefone: telefone,
                img_cliente: imagem
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



app.post('/login', async (req, resp) => {
    try {
        let { email, senha } = req.body;

        let r = await db.infod_leo_cliente.findOne(
            {
                where: {
                    ds_email: email,
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

app.post('/cadastro', async (req, resp) => {
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

app.put('/funcionario/:id', async (req, resp) => {
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
        let r = await db.infod_leo_agendamento.findAll({ 
            include: [
                {
                    model: db.infod_leo_cliente,
                    as: 'id_cliente_infod_leo_cliente',
                    required: true
                },
                {
                    model: db.infod_leo_servico,
                    as: 'id_servico_infod_leo_servico',
                    required: true
                },
                {
                    model: db.infod_leo_funcionario,
                    as: 'id_funcionario_infod_leo_funcionario',
                    required: true
                }
            ],
            order: [['id_agendamento', 'desc']] 
        });
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

//login

app.get('/login', async (req, resp) => {
    try {
        let r = await db.infod_leo_cliente.findAll({ order: [['id_cliente', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})





//email

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



app.post('/enviar', async (req, resp) => {
    try {
        const response = await enviarEmail(req.body.para, req.body.assunto, req.body.mensagem);

        resp.send(response);

    } catch(e) {
        resp.send(e)
    }
})

app.post('/esqueciASenha', async (req, resp) => {

        const loginusu = await db.infod_leo_cliente.findOne({ where: { ds_email: req.body.email } })

        if (!loginusu) {
            resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
          }
        let codigoDeVerificacao = geradorDeNumeros(100000, 999999)

        await db.infod_leo_cliente.update({
            ds_codigo_rec: codigoDeVerificacao
         }, {
             where: { id_cliente: loginusu.id_cliente }
         }
         )


        enviarEmail(req.body.email, 'Aqui está o código para recuperação da sua Conta', `
        <head>
        <style>
        
        div {
            text-aling: center;
            background-color: rgb(12, 21, 38);
        }
        h3 {
            text-aling: center;
            color: rgb(227, 176, 82);
            padding-left: 7em;
        }
        h4 {
            text-aling: center;
            color: rgb(227, 176, 82);
            padding-left: 12em;
            padding-bottom: 5em;
        }
        img {
            
            padding-left: 1.5em;
        }
        b {
            color: white;
        }
        </style>
        </head>
        <body>
        <div>
        <img src="https://leonessalaodebeleza.netlify.app/assets/images/logo2.png" alt="nao foi" /> 
        <h3> Use este código para redifinir sua senha </h3>
        <h4> Seu código de verificação é: <b> ${codigoDeVerificacao} </b> </h4>
        </div>
        </body>
        `
        )
        resp.send({ status: 'ok' });
})

app.post('/validarCodigo', async (req, resp) => {
    const user = await db.infod_leo_cliente.findOne({
      where: {
        ds_email: req.body.email   
      }
    });

    if (!user) {
      resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
    }

    if (user.ds_codigo_rec !== req.body.codigo) {
      resp.send({ status: 'erro', mensagem: 'Código inválido.' });
    }

    resp.send({ status: 'ok', mensagem: 'Código validado.' });

  })

  app.put('/resetSenha', async (req, resp) => {
    const user = await db.infod_leo_cliente.findOne({
      where: {
        ds_email: req.body.email   
      }
    });

    if (!user) {
      resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
    }


    if (user.ds_codigo_rec !== req.body.codigo ||
        user.ds_codigo_rec === '') {
      resp.send({ status: 'erro', mensagem: 'Código inválido.' });
    }

    await db.infod_leo_cliente.update({
      ds_senha: req.body.novaSenha,
      ds_codigo_rec: ''
    }, {
      where: { id_cliente: user.id_cliente }
    })

    resp.send({ status: 'ok', mensagem: 'Senha alterada.' });
  })





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage: storage })

  app.put('/criarArquivo', upload.single('arquivo'), async (req, resp) => {
    const {id} = req.query;
    const {path} = req.file;

    

    const r = await db.infod_leo_cliente.update(
    {
        img_cliente: path
    }, 
    {
        where: { id_cliente: id }
    });

    resp.send({img_cliente: path});
  })

  

  app.put('/criarArquivo2', upload.single('arquivo'), async (req, resp) => {
    const {id} = req.query;
    const {path} = req.file;

    

    const r = await db.infod_leo_funcionario.update(
    {
        img_funcionario: path
    }, 
    {
        where: { id_funcionario: id }
    });

    resp.send({img_funcionario: path});
  })


  app.get('/imagemPerfil', async (req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, { root: path.join(dirname) });
  })

  app.get('/imagemPerfil2', async (req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, { root: path.join(dirname) });
  })



function geradorDeNumeros(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


app.listen(process.env.PORT,
    x => console.log(`>> Server up at port ${process.env.PORT}`))
