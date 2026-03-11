import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BibleBook, Resource, Serie, Tag } from '../interfaces/resource.interface';
import { PaginatedResponse } from '../../common/interfaces/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  http = inject(HttpClient)
  apiUrl = environment.apiUrl


  getResources(page = 1, limit = 12){
   return this.http.get<PaginatedResponse<Resource>>(`${this.apiUrl}/resources`, {
    params: {
      page,
      limit
    }
   })
  }

  getBibleBooks(){
    return this.http.get<BibleBook[]>(`${this.apiUrl}/bible-books`)
  }
  getSeries(){
    return this.http.get<Serie[]>(`${this.apiUrl}/series`)
  }
  getTags(){
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`)
  }
}
