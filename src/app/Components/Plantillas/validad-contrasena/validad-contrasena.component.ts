import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ServicesService } from '../services/services.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-validad-contrasena',
  templateUrl: './validad-contrasena.component.html',
  styleUrls: ['./validad-contrasena.component.css']
})
export class ValidadContrasenaComponent implements OnInit {
  public ContraformGroup: any = FormGroup;
  hide = true;
  public log : any={} 
  public validadContras = 0;
  public contenedor: any = {};

  constructor(
    private _LoginService : LoginService,
    private _ServicesService:ServicesService,
  ){

  }
  ngOnInit(): void {
    this.ContraformGroup = new FormGroup({'Contrasena': new FormControl('', Validators.required)});

  }
  validadContrasena(params:any){
    this.log.contrasena = params
    this.log.ecodCorreo= localStorage.getItem('ecodCorreo'); 
    this._LoginService.postValidadContrasena(this.log).then((response:any)=>{
      this.validadContras = response.dl;
      this._ServicesService.diaparadorAutocomprit.emit({valContrasena:this.validadContras})    

    })   
    
  }
}
