import clienteController from './controller/clienteCrontroller.js'
import agendamentoController from './controller/agendamentoController.js'
import emailController from './controller/emailController.js'
import funcionarioController from './controller/funcionarioController.js'
import loginController from './controller/loginController.js'
import servicosController from './controller/servicosController.js'

import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json())

server.use( '/login', loginController );
server.use('/agendamento', agendamentoController);
server.use('/funcionario', funcionarioController);
server.use('/servicos', servicosController);
server.use('/cliente', clienteController);
server.use('/email', emailController);

server.listen(process.env.PORT, () => console.log( 'subiu ja' ))
