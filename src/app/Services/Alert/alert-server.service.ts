import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServerService {

  constructor() { }
  validaderrores(value:any){
    if(value.status==500){
      alertify.alert().setting({
        'closable':false,
        'resizable':false,
        'title':`Error desde la parte del servidor.` ,
        'message':"Hay un problema en el servidor. "
      }).show();
    }

    if(value.status==0){
      alertify.alert().setting({
        'closable':false,
        'resizable':false,
        'title':`Error del servidor.` ,
        'message':`No se pudo encontrar el servidor. <br>Notifique a su proveedor y regrese luego de dar un largo paseo `
      }).show();
    }

    if(value.status==404){
      alertify.alert().setting({
        'closable':false,
        'resizable':false,
        'title':`Error 404 del servidor.` ,
        'message':`NO se pudo encontrar el servidor. <br>No se encontro la url deceada`
      }).show();
    }

    if (value.status==200) {
      alertify.set('notifier','position', 'top-right');
      alertify.success("Todo se ha procesado de forma correcta")
    }
    if (value.status==202) {
      alertify.set('notifier','position', 'top-center');
      alertify.warning("" + value.data.mensaje,8 )
      
    }
    if(value.status==400){
      alertify.alert().setting({
        'closable':false,
        'resizable':false,
        'title':`Algo ha ido mal con la petición.` ,
        'message':" Si recibes este error, prueba a refrescar la página o actualizar tu navegador."
      }).show();
    }
    
    if(value.status==401){
      alertify.set('notifier','position', 'top-center');
      alertify.error('Algo ha ido mal con la petición : ' +value.data.mensaje );
      if (value.data.mensaje == "Token invalido, Inicie sesion nuevamente" || value.data.mensaje == "Usuario invalido, Inicie sesion nuevamente" || value.data.mensaje == "Usuario invalido, No cuenta con los permisos") {
        setTimeout(function(){       
        localStorage.removeItem('logintoken');
        localStorage.removeItem('Menu');
        localStorage.removeItem('ecodCorreo');
        localStorage.removeItem('TipoUsuario');
        localStorage.removeItem('ecod');
        window.location.href = "/login";
        }, 2000);
      }
     
      }
    if (value.status==422) {
      alertify.error("No pudo procesar las instrucciones contenidas")
    }
    if(value.status==503){
      alertify.alert().setting({
        'closable':false,
        'resizable':false,
        'title':`El servidor no está disponible en ese momento.` ,
        'message':"Prueba de nuevo en unos minutos."
      }).show();
    }
    if (value.status==429) {
      alertify.error("Intentelo nuevmente en un minuto");
    }
    
  }
  ErrorGuardar(value:any){
    alertify.alert().setting({
      'closable':false,
      'resizable':false,
      'title':`Por favor corriga los siguientes errores.` ,
      'message':`${value}`
    }).show();
  }
  
  async Guardar(){
     return await new Promise( ( resolve, reject ) => { 
      alertify.confirm("Guardar","¿Deseas guardar la información?",
        () => resolve(1),
        () => resolve(0)
      );
    });
  }
}
