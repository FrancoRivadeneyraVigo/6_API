import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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
  router = inject(Router)
  user = signal<IuserType | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) { return;}

    const response = await this.userServices.getById(id);

    this.user.set(response);
  }

    
  async deleteUser(_id: string | undefined) {
    try {
      const confirmDelete = confirm("Estas seguro que queires elimniar este usuario?");

      if (!confirmDelete) {
        return;
      }

      await this.userServices.deleteUser(_id as string);

      alert("Usuario eliminado correctamente");

      this.router.navigate(['/home']);

    } catch (error: any) {
      console.error('Error deleting user:', error);
    }

  }



}
