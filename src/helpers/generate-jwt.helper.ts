import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '4h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Token could not be generated');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
