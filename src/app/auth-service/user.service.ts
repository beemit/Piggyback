﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { User } from './user';

@Injectable()
export class UserService {
    constructor(
      private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + 'user');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'user/' + _id);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + 'user/register', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + 'user/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + 'users/' + _id);
    }
}
