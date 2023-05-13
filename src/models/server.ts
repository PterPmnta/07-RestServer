import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.db';
import { userRoutes } from '../routes/user.routes';
import { authRoutes } from '../routes/auth.routes';
import { categoryRoutes } from '../routes/category.routes';
import { productRoutes } from '../routes/products.routes';

import * as dotenv from 'dotenv';

dotenv.config();

interface IPaths {
    [key: string]: string;
}

export class Server {
    app;
    port: string;
    paths: IPaths;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;

        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            category: '/api/categorias',
            products: '/api/productos'
        };
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
        this.app.use(this.paths.usuarios, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.category, categoryRoutes);
        this.app.use(this.paths.products, productRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
