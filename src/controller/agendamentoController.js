import express from 'express'
const Router = express.Router;
const app = Router ();




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


export default app;