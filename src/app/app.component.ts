import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Restaurant - web';

  constructor(private titleService: Title, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const pageTitle = this.getPageTitle(this.router.url);
      this.setTitle(pageTitle);
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getPageTitle(url: string): string {
    switch (url) {

      case '/home':
        return 'Home';

      case '/members':
        return 'Members';

      case '/profile':
        return 'Profile';

      case '/login':
        return 'Login';

      case '/error':
        return 'Error';

      case '/coupon':
        return 'Coupon';

      case '/settings':
        return 'Settings';

      case '/tax':
        return 'Tax & Fee';

      case '/unauthorized':
        return 'Unauthorized';

      case '/about':
        return 'About Us';

      default:
        return this.title;
    }
  }

}
