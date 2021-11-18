import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import clienteController from './controller/clienteCrontroller.js'
import agendamentoController from './controller/agendamentoController.js'
import emailController from './controller/emailController.js'
import funcionarioController from './controller/funcionarioController.js'
import loginController from './controller/loginController.js'
import servicosController from './controller/servicosController.js'
import servicoImgController from './controller/servicoImgController.js'
import uploadaArquivoController from './controller/uploadArquivoController.js'



const server = express();
server.use(cors());
server.use(express.json())


server.use('/login', loginController);
server.use('/agendamento', agendamentoController);
server.use('/funcionario', funcionarioController);
server.use('/servicos', servicosController);
server.use('/cliente', clienteController);
server.use('/email', emailController);
server.use('/servicoimg', servicoImgController);
server.use('/upload', uploadaArquivoController);



server.listen(process.env.PORT,
    x => console.log(`>> Server up at port ${process.env.PORT}`))