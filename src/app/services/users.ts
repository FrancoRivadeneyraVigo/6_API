import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';
import { IuserType } from '../interfaces/iuser-type.interface';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);

  private baseUrl: string = "https://peticiones.online/api/users";

  //GET
  getAllPromises(): Promise<IResponse> {
    return lastValueFrom(this.http.get<IResponse>(this.baseUrl));
  }

  //GET by ID
  getById(_id: string): Promise<IuserType> {
    return lastValueFrom(this.http.get<IuserType>(`${this.baseUrl}/${_id}`));
  }

  //POST
  createUser(user:IuserType): Promise<IResponse> {
    return lastValueFrom(this.http.post<IResponse>(this.baseUrl, user));
  }

  //PUT
  updateUser(_id: string, user:IuserType): Promise<IResponse> {
    return lastValueFrom(this.http.put<IResponse>(`${this.baseUrl}/${_id}`, user));
  }

  //DELETE
  deleteUser(_id: string): Promise<IResponse> {
    return lastValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/${_id}`));
  }

}
