import { Profil } from './Profil';

export class Contact {
  constructor(
    public idContact: number,
    public nom: string,
    public prenom: string,
    public gravatar: string,
    public numTel: string,
    public adresse: string,
    public codePostal: string,
    public ville: string,
    public email: string,
    public profil: Profil,
  ) {}
}
