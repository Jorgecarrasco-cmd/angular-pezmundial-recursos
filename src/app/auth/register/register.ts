// register.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NeutralButton } from '../../components/neutral-button/neutral-button';
import { AuthService } from '../services/AuthService.service';
import { RegisterRequest } from '../interfaces/auth.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NeutralButton, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log(this.form.value);

    const register: RegisterRequest = {
      name: this.form.value.nombre!,
      lastname: this.form.value.apellido!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.register(register).subscribe({
      next: (res) => {
        console.log(res);
        this.form.reset()
        this.form.markAsUntouched()
        this.router.navigate(['/'])
      },
      error: (error) => console.log(error),
    });
  }
}
