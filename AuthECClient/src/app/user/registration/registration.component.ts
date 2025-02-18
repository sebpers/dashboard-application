import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;

  formFields = [
    { name: 'firstName', type: 'text', placeholder: 'First name' },
    { name: 'lastName', type: 'text', placeholder: 'Last name' },
    { name: 'email', type: 'text', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
    },
  ];

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s]).*$/),
          ],
        ],
        confirmPassword: [''],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.authService.signUp(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            alert('Successfully signed up!');
          }
        },
        error: (err) => {
          console.error('ERROR: ', err);

          if (err.error.errors) {
            err.error.errors.forEach((error: any) => {
              switch (error.code) {
                case 'DuplicateUserName':
                  break;

                case 'DuplicateEmail':
                  alert(`${error.description}, Registration failed`);
                  break;

                default:
                  alert(
                    'Registration failed, contact the support if the error keeps occuring'
                  );
                  console.error('ERROR:', error);
                  break;
              }
            });
          } else {
            console.error('ERROR: ', err);
          }
        },
      });
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);

    return !!control?.invalid && (this.isSubmitted || !!control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control) return '';

    if (control.hasError('required'))
      return `Please enter your ${controlName
        .replace(/([A-Z])/g, ' $1') // Add a space between the camelCase
        .toLowerCase()}`;

    if (control.hasError('email')) return 'Please enter a valid email address.';

    if (control.hasError('minlength'))
      return 'Please enter a password with at least 6 characters.';

    if (control.hasError('pattern'))
      return 'Please include uppercase, lowercase, and a special character in your password.';

    if (control.hasError('passwordMismatch'))
      return 'Passwords are not matching.';

    return '';
  }
}
