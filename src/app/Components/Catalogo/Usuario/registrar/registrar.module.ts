import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarRoutingModule } from "./registrar-routing.modules";
import { RegistrarComponent } from "./registrar.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ValidadContrasenaModule } from "../../../Plantillas/validad-contrasena/validad-contrasena.module";
import { DetallesModule } from '../detalles/detalles.module';
import { SelectEstatusModule } from 'src/app/Components/Plantillas/Select/select-estatus/select-estatus.module';
import { SelectTipoUsuarioModule } from "src/app/Components/Plantillas/Select/select-tipo-usuario/select-tipo-usuario.module";
@NgModule({
    declarations:[
        RegistrarComponent,
            
    ],
    imports:[
    CommonModule,
    RegistrarRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ValidadContrasenaModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSelectModule,
    DetallesModule,
    SelectEstatusModule,SelectTipoUsuarioModule,MatTooltipModule
    ]
})
export class RegistrarModule{}