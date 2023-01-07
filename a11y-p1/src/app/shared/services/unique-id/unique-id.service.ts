import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {

  constructor(

  ) { }

  // Coloquei essa biblioteca, porque ela vai ser usada em varios componentes e se der problema é de facil manutenção.
  public generateUniqueIdWithPrefix(prefix: string): string {
    const uniqueID = this.generateUniqueId();
    return `${prefix}-${uniqueID}`;
  }

  private generateUniqueId(): string {
    return uuid.v1();
  }
}
