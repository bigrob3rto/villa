import { Component } from '@angular/core';
import { DbService } from '../services/db.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = ''
  password = ''

  /****************************************************** */
  constructor(
    private auth: AuthService,
    private msg: NotificationsService,
    private route: Router
  ) {
  }

  async onSubmit() {
    const data = await this.auth.login(this.email, this.password)

    if (data) {
      this.msg.success("Ok", "Login successfull.")
      this.route.navigate(['/dashboard']);
    }
  }

}
