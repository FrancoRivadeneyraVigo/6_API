import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Users } from '../../services/users';
import { lastValueFrom } from 'rxjs';
import { IuserType } from '../../interfaces/iuser-type.interface';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  userServices = inject(Users);
  route = inject(ActivatedRoute);
  user!: IuserType;
  arrayPromises = signal<IuserType[]>([]);

  async ngOnInit() {
    try {
      const _idParam = this.route.snapshot.paramMap.get('_id');

      const _id = String(_idParam);

      const response = await this.userServices.getById(_id);
      this.user = response;
    }
    catch{
      console.error('Error fetching user details');
      return;
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
