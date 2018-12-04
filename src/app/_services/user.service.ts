import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getCurrentUserId(): string{
        let currentUser: User = JSON.parse(localStorage.getItem('currentUser')) || null;
        return currentUser? currentUser.id : null;
    }
    
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}users`);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}users/?id=${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}users/` + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}users/` + id);
    }
}