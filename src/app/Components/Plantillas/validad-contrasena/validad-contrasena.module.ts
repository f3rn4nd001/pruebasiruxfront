import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidadContrasenaComponent } from "./validad-contrasena.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations:[
        ValidadContrasenaComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule
       ],
    exports: [
        ValidadContrasenaComponent
    ]
})
export class ValidadContrasenaModule{}