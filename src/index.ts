import { FastifyInstance, FastifyRequest } from 'fastify'
import { IUser } from './domain/interfaces/iuser';
import { auth } from './domain/usecases/securityUseCases';

const app: FastifyInstance = require('fastify')()

app.post('/signup', async (req: FastifyRequest, res) => {
    const dataUser: IUser = req.body as { email: string, password: string, name: string };
    const user = await auth.signup(dataUser)
    res.send({ user })
})

app.listen(3000, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
});