import { Injectable } from '@angular/core';
import { UserLocalStorage } from '../models/user-local-storage';

@Injectable({
  providedIn: 'root'
})
export class CommonLocalStorageService {

  constructor() { }

  public addUser(username: string): void {
    let user: UserLocalStorage = {
      username: username
    };
    localStorage.setItem("appsimuser", JSON.stringify(user));
  }

  public getUser(): UserLocalStorage {
    let user: UserLocalStorage = {
      username: ""
    };
    let resp = localStorage.getItem("appsimuser");
    if(resp != null) {
      user = JSON.parse(resp);
    }
    return user;
  }

  public removeUser() {
    localStorage.removeItem("appsimuser");
  }

}
