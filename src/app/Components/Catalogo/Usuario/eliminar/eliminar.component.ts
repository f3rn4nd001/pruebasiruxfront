import { Component,OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ServicesService } from "../../../Plantillas/services/services.service";
import { AlertServerService } from 'src/app/Services/Alert/alert-server.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { GenerarService } from 'src/app/Services/Catalogo/Generar/generar.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit  {
  public textoEncriptado:any='';
  public Menumenu: any =  [];
  tokencontroll = "";
  public ecodUsuario : any=''
  public envio: any = {};
  public validadContras = 0;
  public datos: any = {};
  public FormGroup: any = FormGroup;
  sqlUsusario : any={};
  sqlCorreo:any={};
  public data:any={};

  constructor(
    private _ServicesService:ServicesService,
    private _serviceAlert: AlertServerService,
    public router: Router,
    private _GenerarService:GenerarService,

  ){}

  ngOnInit(): void {
   
   this.ecodUsuario = localStorage.getItem('ecod');  
    if (this.ecodUsuario) {this.getRegistro();}
    else{this.reConsulta();}
    this.FormGroup = new FormGroup({
      'mEliminacion':new FormControl('', Validators.required),
    });
    this.textoEncriptado = localStorage.getItem('Menu');
    this.Menumenu = CryptoJS.AES.decrypt(this.textoEncriptado, environment.encPass).toString(CryptoJS.enc.Utf8);       
    JSON.parse(this.Menumenu).forEach((element:any) => {
      if(window.location.pathname === element.urlController){this.tokencontroll= element.Token}
    });
    this._ServicesService.diaparadorAutocomprit.subscribe(res=>{      
      if (res.valContrasena) {this.validadContras=res.valContrasena}
      else{this.validadContras=0}  
    });
  }

  getRegistro(){
    this.envio.data=this.ecodUsuario
    this.envio.urls="Catalogo/usuario/detalles";
    this._GenerarService.getDetalle(this.envio).then((response:any)=>{  
      this.sqlUsusario=response.sqlUsusario
    })
    localStorage.removeItem('ecod');
  }

  reConsulta(){
    window.location.href ='catalogo/usuario';
  }

  Guardar(){
    if (this.validadContras != 0) {
      let errorsMensaje:any=[];
      let bandera=0;
      let arrCorreo:any = [];
      
      
      if(errorsMensaje.length>0){
        this._serviceAlert.ErrorGuardar(errorsMensaje);
        bandera = 1;
      }

      if (bandera == 0) {
        this._serviceAlert.Guardar().then((response:any)=>{
          if (response == 1) {
            this.data.Usuario = this.FormGroup.value;
            this.data.ecodUsuario = this.ecodUsuario;

            this.data.tokencontroll = this.tokencontroll;            
            this.data.urls="catalogo/usuario/eliminar";
            this._GenerarService.postRegistrar(this.data).then((response:any)=>{
              window.location.href ='catalogo/usuario';            
            });
          }
        });
      }
    }
    else{
      this._serviceAlert.ErrorGuardar("Valide su contraseña");
    }

  }
}
