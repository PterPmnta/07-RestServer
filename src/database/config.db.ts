import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN!);
        console.log('Database connection established');
    } catch (error) {
        console.error(error);
        throw new Error('Error en la conexion a la DB');
    }
};
