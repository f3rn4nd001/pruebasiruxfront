import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import {MatDialogModule,MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{
  public title: string = "";
  public Ususario:any;
  public mensjerisqls: any;
  dataSource: any = [];
  columnsToDisplay =['tCorreo']
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor( public dialogRef: MatDialogRef<DetallesComponent>,   
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.title = this.data.titulo;
    this.Ususario =this.data.Ususario; 
    this.mensjerisqls = this.data.gmail;  
    this.dataSource= new MatTableDataSource(this.mensjerisqls);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
