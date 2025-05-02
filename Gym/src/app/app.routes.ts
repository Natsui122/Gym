import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {path: '', redirectTo: '/usuario', pathMatch: 'full'},
    {path: 'usuario', component: UsuarioComponent},
    {path: '**', redirectTo: '/usuario', pathMatch: 'full'},
    {path: 'admin', component: AdminComponent}
];
