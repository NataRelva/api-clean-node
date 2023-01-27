import { User } from '../entities/user';
import { IUser } from './iuser';
import { IUserData } from './iuserdata';

export interface IAuth {
    login(email: string, password: string): Promise<{ token: string, id: number }>;
    // verify(token: string): Promise<User>;
    signup(user: IUser): Promise<{ token: string, id: number }>;
}