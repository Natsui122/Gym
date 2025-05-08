import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Formulario1Component } from '../../formulario1/formulario1.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [FormsModule, Formulario1Component]
})
export class InicioComponent implements AfterViewInit {
  indiceActual: number = 0;
  totalSlides: number = 0;

  constructor(private http: HttpClient) {
    this.obtenerPlanes();
  }

  ngAfterViewInit() {
    const slides = document.querySelectorAll('.slide');
    this.totalSlides = slides.length;
  }

  anterior() {
    this.indiceActual = this.indiceActual > 0 ? this.indiceActual - 1 : this.totalSlides - 1;
    this.moverCarrusel();
  }

  siguiente() {
    this.indiceActual = this.indiceActual < this.totalSlides - 1 ? this.indiceActual + 1 : 0;
    this.moverCarrusel();
  }

  moverCarrusel() {
    const carrusel = document.getElementById('carrusel');
    if (carrusel) {
      carrusel.style.transform = `translateX(-${this.indiceActual * 100}%)`;
    }
  }

  obtenerPlanes() {
    this.http.get<any[]>('planes.json').subscribe((data) => {
      if (data.length >= 3) {
        for (let i = 1; i <= 3; i++) {
          document.getElementById(`nombre${i}`)!.textContent = data[i - 1].nombre;
          document.getElementById(`descripcion${i}`)!.textContent = data[i - 1].descripcion;
          document.getElementById(`precio${i}`)!.textContent = data[i - 1].precio.toString();
          document.getElementById(`duracion${i}`)!.textContent = data[i - 1].duracion;
        }
      }
    });
  }

  guardarEnLocalStorage(indice: number) {
    const plan = {
      nombre: document.getElementById(`nombre${indice}`)!.textContent,
      descripcion: document.getElementById(`descripcion${indice}`)!.textContent,
      precio: document.getElementById(`precio${indice}`)!.textContent,
      duracion: document.getElementById(`duracion${indice}`)!.textContent,
    };
    localStorage.setItem('planSeleccionado', JSON.stringify(plan));
  }


  //formulario

    agregarMensaje(mensaje: { nombre: string, email: string, asunto: string, mensaje: string }) {
      // Obtener los mensajes existentes del localStorage
      const mensajesGuardados = localStorage.getItem('mensajesContacto');
      let mensajesArray = mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
    
      // Agregar el nuevo mensaje al array
      mensajesArray.push(mensaje);
    
      // Guardar el array actualizado en localStorage
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesArray));
    
      //alert('Formulario enviado con éxito!');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Formulario enviado con éxito!",
        showConfirmButton: false,
        timer: 1500
      });
    }
}
