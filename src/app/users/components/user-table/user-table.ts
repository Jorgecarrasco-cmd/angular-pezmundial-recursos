import { Component, input, output } from '@angular/core';
import { UserResponse } from '../../../auth/interfaces/auth.interface';
import { UserAvatar } from "../../../components/user-avatar/user-avatar";
import { NeutralButton } from "../../../components/neutral-button/neutral-button";

@Component({
  selector: 'app-user-table',
  imports: [UserAvatar, NeutralButton],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css',
})
export class UserTable {
  user = input.required<UserResponse>();
}
