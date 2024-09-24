import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule  } from "@angular/router";

const UsuarioRouting:ModuleWithProviders<any>=RouterModule.forRoot([
    {path:'catalogo/usuario', loadChildren:()=>import('../consulta/consulta.module').then(m=>m.ConsultaModule)},
    {path:'catalogo/usuario/registrar', loadChildren:()=>import('../registrar/registrar.module').then(m=>m.RegistrarModule)},
    {path:'catalogo/usuario/eliminar', loadChildren:()=>import('../eliminar/eliminar.module').then(m=>m.EliminarModule)}
]);

export var objRutasUsuario=[
    UsuarioRouting
]