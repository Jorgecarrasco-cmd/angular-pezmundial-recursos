import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { LoginRequest } from '../interfaces/auth.interface';
import { NeutralButton } from "../../components/neutral-button/neutral-button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NeutralButton],
  templateUrl: './login.html',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {

    if (this.form.get('email')?.invalid || this.form.get('password')?.invalid) {
      this.form.get('email')?.markAsTouched();
      this.form.get('password')?.markAsTouched();
      return;
    }

    const dto: LoginRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.login(dto).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });

  }

}
