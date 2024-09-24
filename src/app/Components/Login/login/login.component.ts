import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from "../../../Services/Login/login.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public FormLogin: any = FormGroup;
  public data:any={};
  public textoEncriptado!: string;

  constructor(
    private _service:LoginService,
    public router: Router,
    public dialog: MatDialog
  ){

  }
  ngOnInit():void{ 
    this.FormLogin = new FormGroup({
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.min(4)])
    });
  }
  get email(){ 
    return this.FormLogin.get('email') ;
  }
  get password(){ 
    return this.FormLogin.get('password') ;
  }
  Login(){
     this.data.email=this.FormLogin.email
    this.data.password =  this.FormLogin.password.replace(/[^\w\s]/gi, "") // Remove non word characters
    .trim() // Remove trailing and leadings spaces
    .replace(/\b\w/g, (s: string) => s.toUpperCase()) // Make the first letter of each word upper case
    localStorage.removeItem('logintoken');
    localStorage.removeItem('Menu');
    localStorage.removeItem('ecodCorreo');
    localStorage.removeItem('TipoUsuario');
    localStorage.removeItem('ecod');
    this._service.poslogin(this.data).then((response:any)=>{
      if (response.token && response.Menu) {        
        var menu = JSON.stringify(response.Menu)
        this.textoEncriptado = CryptoJS.AES.encrypt(menu, environment.encPass).toString();
        localStorage.setItem('Menu', this.textoEncriptado);
        localStorage.setItem('logintoken', JSON.stringify(response.token));
        localStorage.setItem('ecodCorreo', JSON.stringify(response.ecodCorreo));
        localStorage.setItem('TipoUsuario', JSON.stringify(response.TipoUsuario));
        window.location.href = "/home";
      }
    });
  }
  
 
}