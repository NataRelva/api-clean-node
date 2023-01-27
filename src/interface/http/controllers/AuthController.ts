import { FastifyReply, FastifyRequest } from "fastify"
import { auth } from "../../../domain/usecases/securityUseCases"

export class AuthController {

    async create(req: FastifyRequest, res: FastifyReply) {
        const { email, password } = req.body as { email: string, password: string }
        try {
            const user = await auth.signup({ email, password, name: 'teste' })
            res.status(201).send(user)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    async login (req: FastifyRequest, res: FastifyReply) {
        const { email, password } = req.body as { email: string, password: string }
        try {
            const token = await auth.login(email, password)
            res.send({ token })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

    async forgotPassword (req: FastifyRequest, res: FastifyReply) { 
        const { email } = req.body as {email: string}
        try {
            await auth.forgotPassword(email)
            res.send({ message: 'E-mail de recuperação de senha enviado com sucesso' })
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }
}