import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.db';
import { userRoutes } from '../routes/user.routes';
import { authRoutes } from '../routes/auth.routes';
import { categoryRoutes } from '../routes/category.routes';
import { productRoutes } from '../routes/products.routes';
import { searchRoutes } from '../routes/search.routes';
import { uploadsRoutes } from '../routes/upload.routes';
import fileUpload from 'express-fileupload';

import * as dotenv from 'dotenv';
dotenv.config();

export class Server {
    app;
    port: string;
    paths;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            category: '/api/categorias',
            products: '/api/productos',
            search: '/api/buscar',
            uploads: '/api/uploads'
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

        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true
            })
        );
    }

    routes() {
        this.app.use(this.paths.usuarios, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.category, categoryRoutes);
        this.app.use(this.paths.products, productRoutes);
        this.app.use(this.paths.search, searchRoutes);
        this.app.use(this.paths.uploads, uploadsRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
