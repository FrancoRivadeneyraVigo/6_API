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

  getAllPromises(): Promise<IResponse> {
    return lastValueFrom(this.http.get<IResponse>(this.baseUrl));
  }

  getById(id: number): Promise<IuserType> {
    return lastValueFrom(this.http.get<IuserType>(`${this.baseUrl}/${id}`));
  }

}
