import { FastifyInstance } from 'fastify'
import { IAuth } from '../../../domain/interfaces/iauth'
import { Auth } from '../../../domain/usecases/securityUseCases/auth'

export const AuthRoutes = (auth: Auth, router: FastifyInstance) => {
  router.post('/signup', async (req, res) => {
    const { email, password } = req.body as { email: string, password: string }
    try {
      const user = await auth.signup({ email, password, name: 'teste' })
      res.status(201).send(user)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.post('/login', async (req, res) => {
    const { email, password } = req.body as { email: string, password: string }
    try {
      const token = await auth.login(email, password)
      res.status(200).send({ token })
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  })

  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body as { email: string }
    try {
      await auth.forgotPassword(email)
      res.status(204).send()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })
}