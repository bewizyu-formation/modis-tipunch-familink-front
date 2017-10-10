import { Contact } from './Contact';

export class Utilisateur {
  constructor(
    public idUtilisateur: number,
    public email: string,
    public password: string,
    public contact: Contact,
  ) {}
}
