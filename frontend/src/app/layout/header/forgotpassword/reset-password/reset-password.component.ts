import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/service/auth.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  id: string | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === null) {
      this.snackBar.open('User not found', 'Dismiss', commonSnackBarConfig);
    }
    this.createResetPassword();
  }
  createResetPassword(): void {
    const pswd = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    );
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(pswd),
            Validators.minLength(6),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }
  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    return newPassword &&
      confirmPassword &&
      newPassword.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }
  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.ngxLoader.start();
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
        (response) => {
          console.log(response);
          this.ngxLoader.stop();
          this.snackBar.open(response.message, 'Dismiss', commonSnackBarConfig);
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.ngxLoader.stop();
          this.snackBar.open(
            error.error.message,
            'Dismiss',
            commonSnackBarConfig
          );
        }
      );
    } else {
      this.snackBar.open(
        'Password not matched',
        'Dismiss',
        commonSnackBarConfig
      );
    }
  }
  getErrorMessage(controlName: string) {
    const control = this.resetPasswordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName === 'newPassword' && control?.hasError('minlength')) {
      return 'Minimum length 6';
    }
    if (controlName === 'newPassword' && control?.hasError('pattern')) {
      return '1 Number,specialChar & Capital Letter';
    }

    return '';
  }
}
