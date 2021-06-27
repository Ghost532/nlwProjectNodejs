import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/userRepositories"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
    email: string,
    password: string,
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se o email já existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password is incorrect")
        }

        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!password) {
            throw new Error("Email/Password is incorrect")
        }

        //Gerar o token
        const token = sign(
            {
            email: user.email,
            }, 
        "333bac057792d4d419dba9bad8afe0d5", 
            {
            subject: user.id,
            expiresIn: "1d"
            }
        );

        return token;

    }

}

export { AuthenticateUserService }