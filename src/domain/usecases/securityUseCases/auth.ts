import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { IUser } from '../../interfaces/iuser'
import { IAuth } from '../../interfaces/iauth'

export class Auth implements IAuth {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async signup(user: IUser) {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user.password, 10)
    // Create a new user in the database
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    })
    // Generate a JSON web token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)
    // Return the token and the new user's ID
    return { token, id: newUser.id }
  }
   
  async login(email: string, password: string) {
    // Retrieve the user with the provided email
    const user = await this.prisma.user.findOne({
      where: {
        email,
      },
    })
    // If no user was found, throw an error
    if (!user) {
      throw new Error('Invalid email or password')
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
    const user = await this.prisma.user.findOne({
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