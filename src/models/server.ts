import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { userRoutes } from '../routes/user.routes';
import { dbConnection } from '../database/config.db';
import { authRoutes } from '../routes/auth.routes';

dotenv.config();

export class Server {
    app;
    port: string;
    usuariosPath: string;
    authPath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
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
        this.app.use(this.usuariosPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
