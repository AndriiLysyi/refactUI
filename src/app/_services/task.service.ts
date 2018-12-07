import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Task} from '../_models/task';
import {TaskResult} from '../_models/taskResult';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  
  getTask() {
      return this.http.get<Task[]>(`${environment.apiUrl}tasks`);
  }

  register(task: any) {
      return this.http.post<TaskResult>(`${environment.apiUrl}tasks/process`, task);
  }

}
