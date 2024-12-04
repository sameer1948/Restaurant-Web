import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',  
})
export class HomeComponent {
  
  title : string = 'Welcome to RestartUApp';
  description : string = 'Your journey to learning and restarting begins here!';
  link : string = '/new-order';

  images = [
    { src: 'assets/images/web-home-11.jpg', alt: 'Image 1 Description', link: this.link },
    { src: 'assets/images/web-home-12.jpg', alt: 'Image 2 Description', link: this.link },
    { src: 'assets/images/web-home-13.jpg', alt: 'Image 3 Description', link: this.link },
    { src: 'assets/images/web-home-14.jpg', alt: 'Image 4 Description', link: this.link },
    { src: 'assets/images/web-home-15.jpg', alt: 'Image 5 Description', link: this.link },
    { src: 'assets/images/web-home-16.jpg', alt: 'Image 6 Description', link: this.link },
    { src: 'assets/images/web-home-17.jpg', alt: 'Image 7 Description', link: this.link },
    { src: 'assets/images/web-home-18.jpg', alt: 'Image 8 Description', link: this.link },
    { src: 'assets/images/web-home-19.jpg', alt: 'Image 9 Description', link: this.link },
    { src: 'assets/images/web-home-20.jpg', alt: 'Image 10 Description', link: this.link },
    
  ];
 
     
}