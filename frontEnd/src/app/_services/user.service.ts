import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/';
// import { config } from 'rxjs';
// import { config } from 'process';
// import { config } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        // return this.http.get<User[]>(`${config.apiUrl}/users`);
        return this.http.get<User[]>('http://localhost:4200/users')
        // return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        // return this.http.post(`${config.apiUrl}/users/register`, user);
        return this.http.post(`http://localhost:4200/users/register`, user);
    }

    delete(id: number) {
        // return this.http.delete(`${config.apiUrl}/users/${id}`);
        return this.http.delete(`http://localhost:4200/users/${id}`);
    }
}