import { Component } from '@angular/core';
import {BnNgIdleService} from "bn-ng-idle";
import { LoginService } from "./Services/Login/login.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sirux';
  public logintoken : any = '';
  public Menu : any = '';
  public ecodCorreo : any = '';

    constructor(
      private bnIdle: BnNgIdleService,
      private _LoginService :LoginService
    ) {}
  ngOnInit(): void {
    this.logintoken = localStorage.getItem('logintoken');
    this.Menu = localStorage.getItem('Menu');
    this.ecodCorreo = localStorage.getItem('ecodCorreo');

    let res = {};
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (res) {
        localStorage.removeItem('logintoken');
        localStorage.removeItem('Menu');
        localStorage.removeItem('ecodCorreo');
        localStorage.removeItem('TipoUsuario');
        localStorage.removeItem('ecod');
        window.location.href = "/login";
      }});

  }
}
