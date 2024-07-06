import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [
    HomeComponent,NavbarComponent,SliderComponent,
    FooterComponent,RouterModule,RouterOutlet,
    FormsModule,CommonModule,
    HttpClientModule,NotfoundComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'Funi-Eccomerce';
}
