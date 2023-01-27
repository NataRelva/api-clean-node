import { FastifyReply, FastifyRequest } from "fastify";
import { Middleware } from "./interfaces/imiddleware";

export class AuthenticationMiddleware implements Middleware {

    constructor() { 
        console.log('AuthenticationMiddleware constructor')
    }
    handle(req: FastifyRequest, res: FastifyReply, next: (err?: Error) => void): void {
      // code to check if user is authenticated
      console.log('Criar lógica de verificar usuário autenticado');
      next()
    }
}
  