import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IUser } from './domain/interfaces/iuser';
import { auth } from './domain/usecases/securityUseCases';

const fastify = require('fastify')({ logger: true })

fastify.post('/signup', async (req: FastifyRequest, res: FastifyReply) => {
   try {
    const dataUser: IUser = req.body as { email: string, password: string, name: string };
    const user = await auth.signup(dataUser)
    res.send({ user })
   } catch (error) {
    res.status(400).send({ message: error.message })
   }
})

fastify.post('/login', async (req: FastifyRequest, res: FastifyReply) => { 
    const { email, password } = req.body as { email: string, password: string }
    try {
      const token = await auth.login(email, password)
      res.status(200).send({ token })
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await fastify.listen({ port })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();