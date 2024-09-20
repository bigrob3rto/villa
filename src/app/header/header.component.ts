import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLogged = false

  /****************************************************** */
  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });
    this.auth.checkStatus(); // don't forget this!
  }

  logout() {
    this.auth.logout()
  }
}
