export {};
import express from 'express';
import { IUser } from '../interfaces/user';

declare global {
    namespace Express {
        interface Request {
            uid: string;
            user: IUser | null;
        }
    }
}
