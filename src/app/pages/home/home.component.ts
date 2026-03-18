import { Component, inject, signal } from '@angular/core';
import { IuserType } from '../../interfaces/iuser-type.interface';
import { Users } from '../../services/users';
import { IResponse } from '../../interfaces/iresponse.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrayPromises = signal<IuserType[]>([]);
  userServices = inject(Users);

  async ngOnInit() {
    try  {
      let response: IResponse = await this.userServices.getAllPromises();
      this.arrayPromises.set(response.results);
      console.log(response);
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  }
  
  async deleteUser(_id: string) {
    try {
      const confirmDelete = confirm("Estas seguro que queires elimniar este usuario?");

      if (!confirmDelete) {
        return;
      }

      await this.userServices.deleteUser(_id);

      alert("Usuario eliminado correctamente");

      this.arrayPromises.update(users => 
        users.filter(user => user._id !== _id)
      );

    } catch (error: any) {
      console.error('Error deleting user:', error);
    }

  }

}
