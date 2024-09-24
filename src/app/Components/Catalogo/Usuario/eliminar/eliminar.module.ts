import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EliminarComponent } from "./eliminar.component";
import {EliminarRoutingModule  } from "./eliminar-routing.modules";
import { ValidadContrasenaModule } from "../../../Plantillas/validad-contrasena/validad-contrasena.module";
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations:[
        EliminarComponent,
            
    ],
    imports:[
        CommonModule,
        EliminarRoutingModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ValidadContrasenaModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        MatTooltipModule
    ]
})
export class EliminarModule{}