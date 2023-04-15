import express from 'express';
import cors from 'cors';
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
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'GET API'
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'PUT API'
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'POST API'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'DELETE API'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
