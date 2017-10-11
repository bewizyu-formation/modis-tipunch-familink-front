import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationMockService } from './services/authentication-mock.service';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {

  loading: boolean;
  loadingProgress: number;


  constructor(private router: Router, private authService: AuthenticationMockService) {}

  ngOnInit(): void {
    this.loading = true;
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnDestroy(): void {}


  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loadingProgress = 20;
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loadingProgress = 100;
      this.loading = false;
    }

    // Set loading state to false in both of the below events
    // to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loadingProgress = 100;
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loadingProgress = 100;
      this.loading = false;
    }
  }




}
