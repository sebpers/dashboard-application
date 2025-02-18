import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);

    return (
      !!control?.invalid &&
      (this.isSubmitted || !!control.touched || !!control.dirty)
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control) return '';

    if (control.hasError('required'))
      return `Please enter your ${controlName
        .replace(/([A-Z])/g, ' $1') // Add a space between the camelCase
        .toLowerCase()}`;

    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.authService.signIn(this.form.value).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if (err.status === 400) {
            this.errorMessage = err.message;
          } else {
            console.error('Error during login \n', err);
          }
        },
      });
    }
  }
}
