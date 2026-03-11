import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { NeutralButton } from './components/neutral-button/neutral-button';
import { AuthService } from './auth/services/AuthService.service';
import { UserAvatar } from './components/user-avatar/user-avatar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NeutralButton, UserAvatar, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private router: Router) {}

  isAdminRoute() {
    return this.router.url.startsWith('/admin');
  }

  authService = inject(AuthService);
  user = this.authService.user;
  isAdminOpen = false;
  userName = computed(() => this.user()?.name ?? '');
  lastname = computed(() => this.user()?.lastname ?? '');
}
