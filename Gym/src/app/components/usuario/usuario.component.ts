import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../../servicio/usuario';
import { CuentasService } from '../../servicio/cuentas.service';
import { UsuarioEstadoService } from '../../servicio/estado/usuario-estado.service';
import {Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  imports: [FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuario: Usuario = {
    username: '',
    password: '',
    nombre: '',
  };
  loginUsuario: boolean = false

  constructor(private cuentasService: CuentasService, private usuarioEstadoService : UsuarioEstadoService, private router: Router) { }
  
  login(): void {
    const Usuario = this.cuentasService.getUsuario(this.usuario.username);
    this.loginUsuario = this.cuentasService.comprobarCredenciales(this.usuario.username, this.usuario.password);
    if (this.loginUsuario) {
      alert(`Bienvenido ${Usuario?.nombre}`);
      this.usuarioEstadoService.loginUsuario(this.usuario.username);
      this.router.navigate(['/admin']);

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  logout(): void {
    this.usuarioEstadoService.logoutUsuario();
    this.loginUsuario = false;
    this.usuario.username = '';
    this.usuario.password = '';
    this.usuario.nombre = '';
    this.router.navigate(['/usuario']);
  }

}
