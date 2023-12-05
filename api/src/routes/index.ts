

import express, { Request, Response } from "express";
import funcionarios from './funcionariosRoutes'

const routes = (app : any) => {
    app.route('/').get((req : Request, res: Response) =>{
        res.status(200).send({ 
            Message : "CRUD api - teste pxBank"})
    })

    app.use(
        express.json(),
        funcionarios
    )
}

export default routes;