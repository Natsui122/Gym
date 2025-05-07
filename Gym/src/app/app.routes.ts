import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';

export const routes: Routes = [
    {path: '',component: InicioComponent},
    {path: '**',redirectTo: ''},
    {path: '', redirectTo: '/usuario', pathMatch: 'full'},
    {path: 'usuario', component: UsuarioComponent},
    {path: '**', redirectTo: '/usuario', pathMatch: 'full'},
    {path: 'admin', component: AdminComponent}
];
