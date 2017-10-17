import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactList'
})

export class ContactListPipe implements PipeTransform {

  transform(value, args: string) {
    if (args !== undefined) {
      return value.filter((item) => {
        return  item['nom'].toLowerCase().includes(args.toLowerCase()) ||
                item['prenom'].toLowerCase().includes(args.toLowerCase()) ||
                item['profil']['nom'].toLowerCase().includes(args.toLowerCase());
      });
    } else {
      return value;
    }
  }

}
