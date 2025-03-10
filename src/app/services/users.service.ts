import { Injectable, signal } from '@angular/core';
import { User } from '../shared/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() { }

  async fetchUsers() {
    const resp = await fetch(this.apiUrl);
    if (!resp.ok) throw new Error("failed to fetch users")
    const data = await resp.json();
  console.log('data', data)
    return data
  }

  async fetchUserById(userId: number) {
    const response = await fetch(`${this.apiUrl}/${userId}`);
    if (!response.ok) throw new Error("failed to fetch user by id")
    const data = await response.json();
    return data
  }
}
