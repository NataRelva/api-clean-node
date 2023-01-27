import prisma from '../../../infrastructure/db/prisma';
import { Auth } from './auth';
const auth = new Auth(prisma)
export { auth }