import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  templateUrl: './user-avatar.html'
})
export class UserAvatar {

  @Input() name: string = '';
  @Input() lastname: string = '';

  get initial() {
    return this.name ? this.name[0].toUpperCase() : '';
  }

  get lastnameInitial(){
    return this.lastname ? this.lastname[0].toUpperCase() : ''
  }

}
