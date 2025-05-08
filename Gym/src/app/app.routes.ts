import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { Formulario2Component } from './components/formulario2/formulario2.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: "inicio", component: InicioComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'admin', component: AdminComponent}, 
    {path: 'conocenos', component: ConocenosComponent} ,
    {path: 'suscripcion', component: SuscripcionComponent},

];