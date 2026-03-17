import { Component, inject, signal } from '@angular/core';
import { IuserType } from '../../interfaces/iuser-type.interface';
import { Users } from '../../services/users';
import { IResponse } from '../../interfaces/iresponse.interface';

@Component({
  selector: 'app-home',
  imports: [],
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

}
