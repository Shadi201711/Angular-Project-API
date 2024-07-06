import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,
    RouterOutlet, CommonModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{

  loginObj: any =
    {
      "email": '',
      "password": ''
    };

    UserLoggedStatus:boolean = false;

  constructor(private http: HttpClient,
    private route: Router,
    private userService: UserAuthenticationService) { }

  ngOnInit(): void
  {
    this.userService.getLoggedStatus().subscribe( status =>
      {
          this.UserLoggedStatus = status;
      }
    )
  }


  login(): void
  {
    const { email, password } = this.loginObj;
    this.userService.login(email, password).subscribe(
      success => {
        if (success) {
          this.route.navigateByUrl('/products');
        } else {
          console.error('Login failed');
        }
      }
    );
  }

  logout(): void
  {
    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}

