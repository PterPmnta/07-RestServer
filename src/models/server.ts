import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { router } from '../routes/user.routes';
import { dbConnection } from '../database/config.db';

dotenv.config();

export class Server {
    app;
    port: string;
    usuariosPath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.usuariosPath = '/api/usuarios';
        this.createDBConection();
        this.middlewares();
        this.routes();
    }

    async createDBConection() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
