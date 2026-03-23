import { Component, inject, Signal, signal } from '@angular/core';
import { IuserType } from '../../interfaces/iuser-type.interface';
import { Users } from '../../services/users';
import { IResponse } from '../../interfaces/iresponse.interface';
import { RouterLink } from "@angular/router";
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrayPromises = signal<IuserType[]>([]);
  userServices = inject(Users);
  currentPage = signal<number>(1)
  totalPages = signal<number>(0)

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try  {
      let response: IResponse = await this.userServices.getAllPromises(this.currentPage());
      this.arrayPromises.set(response.results);
      this.totalPages.set(response.total_pages)
    } catch (error: any) {
      console.error('No se pudo caragar los datos del usuario', error);
    }
  }

  gotoNext() {
    if (this.currentPage() < this.totalPages())
    {
      this.currentPage.update(p => p+1)
      this.cargarUsuarios();
    }
  }

  gotoPrev() {
    if (this.currentPage() > 1)
    {
      this.currentPage.update(p => p-1)
      this.cargarUsuarios();
    }
  }
  
  async deleteUser(_id: string) {
    try {

      alert("Usuario eliminado correctamente");
      
      this.arrayPromises.update(users => 
        users.filter(user => user._id !== _id)
      );

    } catch (error: any) {
      console.error('Error deleting user:', error);
    }

  }


}
