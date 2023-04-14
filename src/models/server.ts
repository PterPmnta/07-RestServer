import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export class Server {
    app;
    port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT!;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hola Mundo');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
