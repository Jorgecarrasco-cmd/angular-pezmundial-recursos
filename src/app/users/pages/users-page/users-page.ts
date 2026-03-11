import { Component, inject, signal } from '@angular/core';
import { UserTable } from '../../components/user-table/user-table';
import { AuthService } from '../../../auth/services/AuthService.service';
import { UserResponse } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-users-page',
  imports: [UserTable],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
})
export class UsersPage {
  private userService = inject(AuthService);

  users = signal<UserResponse[]>([]);

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.users.set(res.data);
    });
  }
}
