import { Component, EventEmitter, Output,   OnInit } from '@angular/core';
import { Usuario } from '../../servicio/usuario';
import { CuentasService } from '../../servicio/cuentas.service';
import { UsuarioEstadoService } from '../../servicio/estado/usuario-estado.service';
import {Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EjerciciosService } from '../../servicio/ejercicio/ejercicios.service'; // Importa el servicio de ejercicios
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule,],
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

  constructor(private cuentasService: CuentasService, private usuarioEstadoService : UsuarioEstadoService, private router: Router, 
    private ejerciciosService: EjerciciosService 
  ) { } // private ejerciciosService: EjerciciosService para servicio de api externa
  
  login(): void {
    const Usuario = this.cuentasService.getUsuario(this.usuario.username);
    this.loginUsuario = this.cuentasService.comprobarCredenciales(this.usuario.username, this.usuario.password);
    if (this.loginUsuario) {
      //alert(`Bienvenido ${Usuario?.nombre}`);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Bienvenido ${Usuario?.nombre}`,
        showConfirmButton: true
      });
      this.usuarioEstadoService.loginUsuario(this.usuario.username);
      this.router.navigate(['/usuarios']);

    } else {
      //alert('Usuario o contraseña incorrectos');
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Usuario o contraseña incorrectos",
        showConfirmButton: true
      });
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

  //prueba del api externa, se puede eliminar el codigo siguiente y usarlo en el componente que se necesite
  ejercicios: any[] = [];

   /*ngOnInit(): void {
    this.ejerciciosService.getEjercicios().subscribe({

      next: (data) => this.successRequest(data),
      error: (error) => { console.error('Error al obtener los ejercicios:', error);}

    }
      
    );
   }

   successRequest(data: any): void {
    console.log(data);
    this.ejercicios = data;
    console.log(this.ejercicios);
   }*/

    ngOnInit(): void {
      this.ejerciciosService.getEjercicios().subscribe(
        data => {
          this.ejercicios = data;
          console.log(this.ejercicios);
        },
        error => {
          console.error('Error al obtener ejercicios:', error);
        }
      );
    }
  

}
