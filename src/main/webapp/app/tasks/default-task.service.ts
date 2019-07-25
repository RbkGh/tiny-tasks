import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string,userId?: string): Observable<Task> {
    const taskObject:any = {
      name: name,
      user:{
        id : +userId
      }
    };

    console.log(taskObject);
    //return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task);
    return this.http.post<Task>(this.baseUrl + '/tasks', taskObject as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getAllByUser(userId:string): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks'+'/'+userId);
  }
}
