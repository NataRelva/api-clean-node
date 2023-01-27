import bcrypt from 'bcrypt';

import { IUser } from "../interfaces/iuser";
import { IUserData } from "../interfaces/iuserdata";

export class User implements IUser {
  public id: number;
  public email: string;
  public name: string;
  public password: string;

  constructor(data: IUserData) {
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
  }

  // SRP: método para encriptar senha
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  // OCP: método para atualizar dados do usuário
  public update(data: IUserData): void {
    this.email = data.email;
    this.password = this.hashPassword(data.password);
  }

  public create(data: IUserData): void {
    this.email = data.email;
    this.name = data.name;
    this.password = this.hashPassword(data.password);
  }

  // LSP: método para verificar a senha
  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

}