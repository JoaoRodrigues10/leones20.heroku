import db from '../db.js'
import enviarEmail from '../email.js'

import express from 'express'
const Router = express.Router
const app = Router ();

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

  function geradorDeNumeros(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

export default app;
