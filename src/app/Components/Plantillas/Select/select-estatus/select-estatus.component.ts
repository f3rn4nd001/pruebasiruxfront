import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from "../../services/services.service";
import { GenerarService } from "../../../../Services/Catalogo/Generar/generar.service";
@Component({
  selector: 'app-select-estatus',
  templateUrl: './select-estatus.component.html',
  styleUrls: ['./select-estatus.component.css']
})
export class SelectEstatusComponent implements OnInit{
  public NuevoMenuFormGroup: any = FormGroup;
  public datos: any = {};
  public Estatus:any=[];
  public metodos: any = {eNumeroRegistros:10, tMetodoOrdenamiento:'tNombre', orden:'DESC' };
  public envio: any = {filtros:{}};

constructor(
  private _GenerarService:GenerarService,  
  private _ServicesService:ServicesService
){}

ngOnInit(): void {
  this.NuevoMenuFormGroup = new FormGroup({'EcodEstatus':new FormControl('')});

  this._ServicesService.diaparadorAutocomprit.subscribe(res=>{
    if (res.ecodEstatus) {this.datos.ecodEstatus=res.ecodEstatus} 
  });
  this.envio.metodos=this.metodos;
  this.envio.urls="Catalogo/estatus/comprementos";

  this._GenerarService.getRegistrosCompremento(this.envio).then((response:any)=>{
    this.Estatus= response.sqlcatEstatus;
  });
}
selectsa(){  
  this._ServicesService.diaparadorAutocomprit.emit({EcodEstatus:this.datos.ecodEstatus})
}
}