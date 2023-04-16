import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { router } from '../routes/user.routes';

dotenv.config();

export class Server {
    app;
    port: string;
    usuariosPath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.usuariosPath = '/api/usuarios';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
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
