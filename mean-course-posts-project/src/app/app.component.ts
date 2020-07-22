import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean-course-posts-project';

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
