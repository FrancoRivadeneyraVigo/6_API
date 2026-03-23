import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IResponse } from '../../interfaces/iresponse.interface';
import { IuserType } from '../../interfaces/iuser-type.interface';
import { RouterLink } from "@angular/router";
import { Users } from '../../services/users';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  user = input<IuserType>();
  userServices = inject(Users);
  @Output() deleteEmit: EventEmitter<string> = new EventEmitter();

  async deleteUser(_id: string | undefined) {
    try {
      await this.userServices.deleteUser(_id);
      
        alert(`Seguro que quieres eliminar el Usario ${(await this.userServices.getById(_id)).username} ?`)
        this.deleteEmit.emit(_id)

    }catch (error)
    {
      console.log(error)
    }
  }

}
