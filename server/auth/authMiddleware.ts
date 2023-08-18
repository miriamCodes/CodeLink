import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { Secret, Jwt } from 'jsonwebtoken';
import 'dotenv/config';



const secretRetriever = expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`
});

const customSecretFunction = async (
    req: JWTRequest, 
    token: Jwt | undefined
): Promise<Secret> => {
    return new Promise((resolve, reject) => {
        secretRetriever(req, req.headers.authorization || '', token?.header || {}, (err: Error, secret?: Secret) => {
            if (err) {
                console.log('Error in customSecretFunction:', err);
                reject(err);
            } else {
                resolve(secret as Secret);
            }
        });
    });
};

const checkJwt = expressjwt({
    secret: customSecretFunction,
    audience: process.env.CLIENT_ID,
    issuer: `https://${process.env.ISSUER_BASE_URL}/`,
    algorithms: ['RS256']
});

export default checkJwt;

