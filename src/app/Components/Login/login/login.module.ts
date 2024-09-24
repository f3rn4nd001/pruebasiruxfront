import { NgModule } from '@angular/core';
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    declarations:[
        LoginComponent,
        
    ],
    imports:[
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
    ]
})
export class LoginModule{}