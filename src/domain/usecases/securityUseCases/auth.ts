import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { IUser } from '../../interfaces/iuser'
import { IAuth } from '../../interfaces/iauth'
import { User } from '../../entities/user'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export class Auth implements IAuth {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {this.prisma = prisma}

  async signup(user: IUser) {    
    try {

      const password = await bcrypt.hash(user.password, 10);
      const { id } = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password,
        },
      })
      // Generate a JSON web token
      const token = jwt.sign({ id }, process.env.JWT_SECRET)
      // Return the token and the user's ID
      return { token, id }

    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code === 'P2002') { 
        throw new Error('Userário já existe');
      } 
      throw new Error('Algo deu errado')
    }
  }
   
  async login(email: string, password: string) {
    // Retrieve the user with the provided email
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    // If no user was found, throw an error
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    // Compare the provided password to the hashed password in the database
    const valid = await bcrypt.compare(password, user.password)
    // If the password is invalid, throw an error
    if (!valid) {
      throw new Error('Invalid email or password')
    }
    // Generate a JSON web token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    // Return the token and the user's ID
    return { token, id: user.id }
  }

  async verify(token: string) {
    // Verify the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as { id: number }
    // Retrieve the user with the provided ID
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    // If no user was found, throw an error
    if (!user) {
      throw new Error('Invalid token')
    }
    // Return the user's data
    return user
  }
}