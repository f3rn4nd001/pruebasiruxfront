import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray, MaxLengthValidator } from '@angular/forms';
import { ServicesService } from "../../../Plantillas/services/services.service";
import {GenerarService} from "../../../../Services/Catalogo/Generar/generar.service";
import { Router } from '@angular/router';
import { AlertServerService } from 'src/app/Services/Alert/alert-server.service';
import { DetallesComponent } from '../detalles/detalles.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer  } from "@angular/platform-browser";
import validateRfc from 'validate-rfc';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {
  public ecodUsuario : any=''
  public Menumenu: any =  [];
  public textoEncriptado:any='';
  tokencontroll = "";
  public datos: any = {};
  public envio: any = {};
  public datosUsuarios : any = '';
  public validadContras = 0;
  public NuevoFormGroup: any = FormGroup;
  public data:any={};
  public Generar: any = FormGroup;
  previaualizacion:string ='';
  public Sexo:any=[{tNombre:"Masculino" },{ tNombre:"Femenino"}];

  constructor(
    private _ServicesService:ServicesService,
    private _GenerarService:GenerarService,
    private _serviceAlert: AlertServerService,
    private dialog: MatDialog,
    public router: Router,
    public sanitizer:DomSanitizer
  ){}
  
  ngOnInit(): void {
  
    this.ecodUsuario = localStorage.getItem('ecod');  
    if (this.ecodUsuario) {this.getEditarRegistro();}
    this.NuevoFormGroup = new FormGroup({
      'tNombre':new FormControl('', Validators.required),
      'tApellido':new FormControl('',),
      'tCRUP':new FormControl(''),
      'tSexo':new FormControl(''),
      'nEdad':new FormControl(''),
      'nTelefono':new FormControl(''),
      'fhNacimiento':new FormControl(''),
      'tRFC':new FormControl(''),
      'iUsuario':new FormControl(''),
      'tNotas':new FormControl(''),
    });
    this.Generar = new FormGroup({'formArray': new FormArray([])});
    this.textoEncriptado = localStorage.getItem('Menu');
    this.Menumenu = CryptoJS.AES.decrypt(this.textoEncriptado, environment.encPass).toString(CryptoJS.enc.Utf8);       
    JSON.parse(this.Menumenu).forEach((element:any) => {
      if(window.location.pathname === element.urlController){this.tokencontroll= element.Token}
    });
    this._ServicesService.diaparadorAutocomprit.subscribe(res=>{
      if (res.EcodEstatus ) {this.datos.ecodEstatus=res.EcodEstatus;}
      if (res.valContrasena) {this.validadContras=res.valContrasena}
      else{this.validadContras=0}  
    });
    this.annadirinputConcepto();   
  }

  getEditarRegistro(){
    this.envio.data=this.ecodUsuario
    this.envio.urls="Catalogo/usuario/detalles";
    this._GenerarService.getDetalle(this.envio).then((response:any)=>{  
      this.datosUsuarios = (response.sqlUsusario);   
      this.datosUsuarios.mail = (response.sqlCorreo);   
      this.datos.tNombre = this.datosUsuarios.tNombre;   
      this.datos.tApellido = this.datosUsuarios.tApellido;   
      this.datos.tCRUP = this.datosUsuarios.tCRUP;
      this.datos.tRFC = this.datosUsuarios.tRFC;
      this.datos.nEdad = this.datosUsuarios.nEdad;
      this.datos.nTelefono = this.datosUsuarios.nTelefono;
      this.datos.tSexo = this.datosUsuarios.tSexo;
      this.datos.iUsuario = this.datosUsuarios.iUsuario;
      this.datos.tNotas = this.datosUsuarios.tNotas;
      this.datos.fhNacimiento = this.datosUsuarios.fhNacimiento;
      this.datos.ecodUsuario = this.datosUsuarios.ecodUsuario;   
      this.datos.ecodEstatus = this.datosUsuarios.ecodEstatus;
      if (this.datosUsuarios.mail.length != 0) {
        this.datosUsuarios.mail.forEach((icarcore:any) => {        
          if(icarcore.tCorreo != null){
            (this.Generar.controls['formArray'] as FormArray).push(new FormGroup({
              'ecodCorreo':new FormControl(icarcore.ecodCorreo),
              'Correo': new FormControl(icarcore.tCorreo),
            }))
          }
        });
        this.eliminarinputConcepto(0);
      }     
      this._ServicesService.diaparadorAutocomprit.emit({
        ecodEstatus:this.datosUsuarios.ecodEstatus,
        Estatus:this.datosUsuarios.Estatus
      }); 
    });
    localStorage.removeItem('ecod');   
  }
  
 

  reConsulta(){
    window.location.href ='catalogo/usuario';
  }

  Imagen(event: any) {
    const Archivo = event.target.files[0];
    this.extraerBase64(Archivo).then((imagen:any)=>{
      this.previaualizacion= imagen.base            
    })
  }

  extraerBase64= async($event:any)=> new Promise((resolve, reject)=>{
    try{
      const undafeimg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(undafeimg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({base:reader.result});
      };
      reader.onerror=error=>{
        resolve({base:null});
      };
    }catch(e){}
  })

  mayusculaRFC() {
    let cadena:any = this.NuevoFormGroup.value.tRFC;
    let mayusculas = cadena.toUpperCase();
	  this.datos.tRFC=mayusculas
	}

  mayusculaCURP() {
    let cadena:any = this.NuevoFormGroup.value.tCRUP;
    let mayusculas = cadena.toUpperCase();
	  this.datos.tCRUP=mayusculas
	}

  digitoVerificadorCURP(curp17:any) {
    var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
      lngSuma      = 0.0,
      lngDigito    = 0.0;
    for(var i=0; i<17; i++)
        lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    lngDigito = 10 - lngSuma % 10;
    if (lngDigito == 10) return 0;
    return lngDigito;
  }

  Guardar(){    
    if (this.validadContras != 0) {
      let errorsMensaje=[];
      let bandera=0;
      let arrCorreo:any = [];
      if ((this.NuevoFormGroup.value.tNombre == null) || (this.NuevoFormGroup.value.tNombre == '') ) {
        errorsMensaje.push("El campo nombre no puede estar vacio");
      }
      if ((this.NuevoFormGroup.value.tApellido == null) || (this.NuevoFormGroup.value.tApellido == '') ) {
        errorsMensaje.push("El campo apellido no puede estar vacio");
      }
      if (this.NuevoFormGroup.value.tRFC) {
        const response = validateRfc(this.NuevoFormGroup.value.tRFC);        
        if (response.isValid == false) {errorsMensaje.push("<br>El RFC no es valido");}
      }
      if (this.NuevoFormGroup.value.tCRUP) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = this.NuevoFormGroup.value.tCRUP.match(re);
        if (validado) {if (validado[2] != this.digitoVerificadorCURP(validado[1])) {errorsMensaje.push("<br>La CRUP no es valido");}}
        else{errorsMensaje.push("<br>La CRUP no es valido");}
      }  
      
      this.Generar.value.formArray.forEach((element:any) => {
        if (element.Correo != '' || element.ecodCorreo != '' ) {
          arrCorreo.push({
            tCorreo : element.Correo,
            tContrasena:element.Contrasena,
            ecodCorreo:element.ecodCorreo
          });
        }
      }); 
      if(errorsMensaje.length>0){
        this._serviceAlert.ErrorGuardar(errorsMensaje);
        bandera = 1;
      }

      if (bandera == 0) {
        this._serviceAlert.Guardar().then((response:any)=>{
          if (response == 1) {
            this.data.Usuario = this.NuevoFormGroup.value;
            this.data.Usuario.ecodUsuario = this.ecodUsuario;
            this.data.Usuario.ecodEstatus = this.datos.ecodEstatus;
            this.data.Usuario.arrCorreo = arrCorreo;
            this.data.tokencontroll = this.tokencontroll;            
            this.data.urls="catalogo/usuario/registrar";
            this._GenerarService.postRegistrar(this.data).then((response:any)=>{
              this.envio.data=response.Codigo
              this.envio.urls="Catalogo/usuario/detalles";
              this._GenerarService.getDetalle(this.envio).then((response:any)=>{
                let dialogRef = this.dialog.open(DetallesComponent, {
                  data: {  titulo: "Detalle de usuario",Ususario:response.sqlUsusario,gmail:response.sqlCorreo}
                });  
                dialogRef.afterClosed().subscribe(result => { 
                  this.router.navigate(['catalogo/usuario']);      
                });
              })            
            });
          }
        });
      }
    }
    else{
      this._serviceAlert.ErrorGuardar("Valide su contraseña");
    }
  }

  annadirinputConcepto(){
    (this.Generar.controls['formArray']).push(new FormGroup({
      'ecodCorreo': new FormControl(''),
      'Correo': new FormControl('',Validators.email ),
      'Contrasena': new FormControl(''),
    }));
  }

  eliminarinputConcepto(index: number) { 
    if (this.Generar.value.formArray.length == 1) {  
      this._serviceAlert.ErrorGuardar('Debe haber al menos 1 correo');
    }
    else{
      (this.Generar.controls['formArray']).removeAt(index);
    }
  }
}
