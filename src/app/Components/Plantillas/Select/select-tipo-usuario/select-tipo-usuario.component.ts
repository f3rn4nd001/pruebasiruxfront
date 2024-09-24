import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from "../../services/services.service";
import { GenerarService } from "../../../../Services/Catalogo/Generar/generar.service";

@Component({
  selector: 'app-select-tipo-usuario',
  templateUrl: './select-tipo-usuario.component.html',
  styleUrls: ['./select-tipo-usuario.component.css']
})
export class SelectTipoUsuarioComponent implements OnInit {
  public NuevoFormGroup: any = FormGroup;
  public datos: any = {};
  public TipoUsuario:any=[];
  public metodos: any = {eNumeroRegistros:10, tMetodoOrdenamiento:'ecodTipoUsuario', orden:'DESC' };
  public envio: any = {filtros:{}};

constructor(
  private _GenerarService:GenerarService,  
  private _ServicesService:ServicesService
){}

ngOnInit(): void {
  this.NuevoFormGroup = new FormGroup({'ecodTipoUsuario':new FormControl('')});

  this._ServicesService.diaparadorAutocomprit.subscribe(res=>{
    if (res.ecodTipoUsuario) {this.datos.ecodTipoUsuario=res.ecodTipoUsuario} 
  });
  this.envio.metodos=this.metodos;
  this.envio.urls="catalogo/tipousuario/comprementos";

  this._GenerarService.getRegistrosCompremento(this.envio).then((response:any)=>{
    this.TipoUsuario= response.sqlcatEstatus;
  });
}
selectsa(){  
  this._ServicesService.diaparadorAutocomprit.emit({ecodTipoUsuario:this.datos.ecodTipoUsuario})
}
}
