import db from '../db.js'
import multer from 'multer'
import path from 'path'

import express from 'express'
const Router = express.Router
const app = Router ();



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

export default app;