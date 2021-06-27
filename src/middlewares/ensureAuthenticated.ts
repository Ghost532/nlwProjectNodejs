import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken"

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) { 


    // Receber o token
    const authToken = request.headers.authorization;
    console.log(authToken);

    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")

    try {
    // Validar se token é válido
    const { sub } = verify(token, "333bac057792d4d419dba9bad8afe0d5") as IPayLoad;
    // Recuperar informações do usuário
        request.user_id = sub;
    }catch(err) {
        return response.status(401).end();
    }

    
    



    return next();
}