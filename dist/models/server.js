var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import { userRoutes } from '../routes/user.routes';
import { dbConnection } from '../database/config.db';
import { authRoutes } from '../routes/auth.routes';
import * as dotenv from 'dotenv';
dotenv.config();
export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.createDBConection();
        this.middlewares();
        this.routes();
    }
    createDBConection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection();
        });
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
//# sourceMappingURL=server.js.map