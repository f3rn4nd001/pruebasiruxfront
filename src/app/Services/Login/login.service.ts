import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/app/environments/environment.prod';
import {AlertServerService} from '../Alert/alert-server.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  postRegistrar() {
    throw new Error('Method not implemented.');
  }

  private readonly CHAR_RANGE = 126 - 32 + 1; // m
  constructor(
    private _service:AlertServerService
  ) { }

  private shiftChar(char: string, shift: number): string {    
    const charCode = char.charCodeAt(0);
    const newCharCode = ((charCode - 32 + shift + this.CHAR_RANGE) % this.CHAR_RANGE) + 32;
    return String.fromCharCode(newCharCode);
  }

  shiftText(json: string, shift:number): string {   
    return json.split('').map(char => this.shiftChar(char, shift)).join('');
  }
  poslogin(data:any){
   let json=JSON.stringify(data);
    let gdas = '';  
    gdas=this.shiftText(json,23);
  	var api = `${environment.direcurl}api/Login`;	
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:gdas,haders:"Ox_mSak@t~r}uh_GoerfQly_=EM$4iIYk#v4oFguL)TY2b0~O["})
			.then(response => {        
          this._service.validaderrores(response);
          resolve( JSON.parse(this.shiftText(response.data,-23))
        );   
			}).catch((error) => {
        reject(error);
        if (error.response) {
          this._service.validaderrores(error.response);
          console.log(error.response);
          
        } else if (error.request) {
          this._service.validaderrores(error.request);
          console.log(error.request);
          
        } else {
          console.log('Error', error.message);
        }
      });
		});
	}
  postLogout(data:any){
    var api = `${environment.direcurl}api/Login/postLogout`;	
    let json=JSON.stringify(data);
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:json,headers:environment.header})
			.then(response => {        
					resolve(response.data);   
			}).catch((error) => {          
        reject(error);
      });
		});
  }
  
  postValidadContrasena(data:any){
    let jsonHeader=JSON.stringify(environment.header);
    let Hdas = '';  
    Hdas=this.shiftText(jsonHeader,23);
    let jsondata=JSON.stringify(data);
    let Ddas = '';  
    Ddas=this.shiftText(jsondata,23);
    var api = `${environment.direcurl}api/Login/postValidadContrasena`;	
    let json=JSON.stringify(data);
		return new Promise( ( resolve, reject ) => { 
			axios.post(api,{datos:Ddas,headers:Hdas})
			.then(response => {        
        resolve( JSON.parse(this.shiftText(response.data,-23)));
			}).catch((error) => { 
        this._service.validaderrores(error.response);
        reject(error);

      });
		});
  }
}
