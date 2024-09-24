import { Component ,OnInit,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { GenerarService } from "../../../../Services/Catalogo/Generar/generar.service";
import { DetallesComponent } from '../detalles/detalles.component';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-consulta',
  templateUrl: '../../../Plantillas/Consulta/consulta.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  tituloConsulta="";
  dataSource: any = [];
  dataSource2: any = [];
  controller:any[] = [];
  public datos: any = [];
  public getdatos: any = {};
  public mostrar = true;
  public filtroForm: any = FormGroup;
  public contenedor: any = {};
  public metodos: any = {eNumeroRegistros:100, tMetodoOrdenamiento:'ecodUsuario', orden:'DESC' };
  public envio: any = {};
  tokencontroll = "";
  public textoEncriptado:any='';

  botones=[{nombre:'Registrar',relURL:'/catalogo/usuario/registrar'}];

  MenuDesplegable:any=[
    {nombre:'Ver detalles', relURL:'catalogo/usuario'},
    {nombre:'N/A', relURL:'/catalogo/usuario/registrar'},
    {nombre:'N/A', relURL:'/sistemas/permisos/registrar'},
    {nombre:'N/A', relURL:'/catalogo/usuario/eliminar'},
  ];

  columns = [
    { columnDef: 'E',         header: 'E',   colMovil:1,       cell: (element= this.dataSource.ecodUsuario) => `${element.ecodUsuario}`},
    { columnDef: 'ecodUsuario',  header: 'Folio',   colMovil:1,   cell: (element= this.dataSource.ecodUsuario) => `${element.ecodUsuario}`},
    { columnDef: 'tNombre',   header: 'Nombre',   colMovil:1,  cell: (element= this.dataSource.tNombre) => `${element.tNombre}`},
    { columnDef: 'tRFC',   header: 'RFC',   colMovil:1,  cell: (element= this.dataSource.tRFC) => `${element.tRFC}`},
    { columnDef: 'tCRUP',   header: 'CURP',   colMovil:1,  cell: (element= this.dataSource.tCRUP) => `${element.tCRUP}`},
    { columnDef: 'estatus',   header: 'Estatus',   colMovil:1,  cell: (element= this.dataSource.estatus) => `${element.estatus}`},
  ]

  columns2 = [
    { columnDef: 'E',         header: 'E',         cell: (element= this.dataSource2.ecodUsuario) => `${element.ecodUsuario}`},
    { columnDef: 'tNombre',   header: 'Nombre',    cell: (element= this.dataSource2.tNombre) => `${element.tNombre}`},
   
  ]

  filtrodatas = [
    {Nombre : 'Folio',       filtroREl:'filtroForm.value.ecodUsuario',  formControlName:'ecodUsuario', tipos:'text'},  
    {Nombre : 'Nombre',   filtroREl:'filtroForm.value.tNombre',   formControlName:'tNombre',  tipos:'text'},  
    {Nombre : 'RFC',   filtroREl:'filtroForm.value.tRFC',   formControlName:'tRFC',  tipos:'text'},  
    {Nombre : 'CURP',   filtroREl:'filtroForm.value.tCRUP',   formControlName:'tCRUP',  tipos:'text'},  
    {Nombre : 'Estatus',   filtroREl:'filtroForm.value.estatus',   formControlName:'estatus',  tipos:'text'},  
  ]

  displayedColumns = this.columns.map(c => c.columnDef);
  displayedColumns2 = this.columns2.map(c => c.columnDef);

  
  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  constructor(public dialog: MatDialog, private _GenerarService:GenerarService){}

  ngOnInit(): void {
    this.filtroForm = new FormGroup({
      'ecodUsuario': new FormControl('', []),
      'tNombre': new FormControl('', []),
      'tRFC': new FormControl('', []),
      'tCRUP': new FormControl('', []),
      'estatus': new FormControl('', []),
      'eNumeroRegistros': new FormControl('', []),
    });
    this.textoEncriptado = localStorage.getItem('Menu');
    this.datos = CryptoJS.AES.decrypt(this.textoEncriptado, environment.encPass).toString(CryptoJS.enc.Utf8);       
    JSON.parse(this.datos).forEach((element:any) => {
      if(window.location.pathname == element.urlSubMenu){ 
        this.tokencontroll= element.Token
        this.tituloConsulta = element.submenu;        
        this.controller.push({
          urlController:element.urlController,
          Nombres:element.Controller
        })
      }
    });
    this.getRegistros();
  }

  getRegistros(){
    this.envio.metodos=this.metodos;
    this.envio.urls="catalogo/usuario";
    this.envio.tokencontroll=this.tokencontroll;
    this._GenerarService.getRegistros(this.envio).then((response:any)=>{
      this.getdatos = (response);    
      this.dataSource= new MatTableDataSource(this.getdatos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource2= new MatTableDataSource(this.getdatos);
      this.dataSource2.paginator = this.paginator2;
    }).catch((error)=>{});
  }
  
  relparams(data:any){
    localStorage.setItem('ecod', data);
  }

  getDetalles(data:any){
    this.envio.data=data
    this.envio.urls="Catalogo/usuario/detalles";
    this._GenerarService.getDetalle(this.envio).then((response:any)=>{      
      let dialogRef = this.dialog.open(DetallesComponent, {
        data: {  titulo: "Detalle de usuario",Ususario:response.sqlUsusario,gmail:response.sqlCorreo
      }
      });
    })
  }
  
  filtro(){
    if (this.filtroForm.value.eNumeroRegistros == null || this.filtroForm.value.eNumeroRegistros == '' ) {this.metodos.eNumeroRegistros = 100}
    else{this.metodos.eNumeroRegistros=this.filtroForm.value.eNumeroRegistros}
    this.envio.metodos=this.metodos;
    this.envio.urls="catalogo/usuario";
    this.envio.filtros=this.filtroForm.value
    this._GenerarService.getRegistros(this.envio).then((response:any)=>{
      this.getdatos = (response);    
      this.dataSource= new MatTableDataSource(this.getdatos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource2= new MatTableDataSource(this.getdatos);
      this.dataSource2.paginator = this.paginator2;
    }).catch((error)=>{});
  }
  mostrarfiltro(){this.mostrar = !this.mostrar;}
}
