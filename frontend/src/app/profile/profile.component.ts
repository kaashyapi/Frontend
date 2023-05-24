import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonSnackBarConfig } from '../service/snackbar-config.service';
import { UserRoleService } from '../service/user-role.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  name = localStorage.getItem('name') || 'User';
  userRole: string;
  public userid: any = localStorage.getItem('userId');
  
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public userService: UserRoleService,
    private router: Router
  ) {}
  data: any;
  onSignOut(): void {
    this.authService.signOut(this.data).subscribe(
      (response) => {
        this.authService.isSignedIn = false;
        this.authService.authChanged.emit(false);
        console.log(response);
        this.snackBar.open(response.message, 'Dismiss', commonSnackBarConfig);
        this.router.navigate(['/']);
        window.location.reload();
      },
      (error) => {
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
  ngOnInit(): void {
    this.userService.getUserRole(this.userid).subscribe(
      (response) => {
        this.userRole = response.userRole;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
