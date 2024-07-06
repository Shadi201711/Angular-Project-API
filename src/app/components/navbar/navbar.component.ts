import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private subscription: Subscription | undefined;
  //CTOR
  constructor(private route: Router, private userService: UserAuthenticationService) { }
  //
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.IsAdmin();
    this.subscription = this.userService.getLoggedStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.subscription = this.userService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });


    const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedInFromLocalStorage) {
      this.isLoggedIn = true;


      const isAdminFromLocalStorage = localStorage.getItem('IsAdmin') === 'true';
      if (isAdminFromLocalStorage) {
        this.isAdmin = true;
      }
    }

  }

  logout(): void {

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('IsAdmin');

    this.isLoggedIn = false;
    this.isAdmin = false;

    this.userService.logout();
    this.route.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
