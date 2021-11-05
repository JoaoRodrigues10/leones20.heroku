import express from 'express'
const Router = express.Router;
const app = Router ();



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



app.get('/login', async (req, resp) => {
    try {
        let r = await db.infod_leo_cliente.findAll({ order: [['id_cliente', 'desc']] });
        resp.send(r)
    }catch(e) {
        resp.send( {erro: 'Deu erro'} );
        console.log(e.toString());
    }
})

export default app;