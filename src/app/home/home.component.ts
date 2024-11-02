import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',  
})
export class HomeComponent {
  
  title : string = 'Welcome to RestartUApp';
  description : string = 'Your journey to learning and restarting begins here!';
  link : string = '/order';

  images = [
    { src: 'assets/images/web-home-1.jpg', alt: 'Image 1 Description', link: this.link },
    { src: 'assets/images/web-home-2.jpg', alt: 'Image 2 Description', link: this.link },
    { src: 'assets/images/web-home-3.jpg', alt: 'Image 3 Description', link: this.link },
    { src: 'assets/images/web-home-4.jpg', alt: 'Image 4 Description', link: this.link },
    { src: 'assets/images/web-home-5.jpg', alt: 'Image 5 Description', link: this.link },
  ];
 
     
}