import { IAuth } from '../../domain/interfaces/iauth'

export const AuthRoutes = (auth: IAuth, router: any) => {
  router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
    //   const user = await auth.signup(email, password)
    //   res.status(201).send(user)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const token = await auth.login(email, password)
      res.status(200).send({ token })
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  })

  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body
    try {
    //   await auth.forgotPassword(email)
      res.status(204).send()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })
}