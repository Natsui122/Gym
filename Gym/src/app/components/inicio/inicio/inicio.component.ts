import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Formulario1Component } from '../../formulario1/formulario1.component';
import Swal from 'sweetalert2';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

interface Slide {
  src: string;
  alt: string;
}

interface Plan {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [FormsModule, Formulario1Component, MatSlideToggleModule, MatCardModule]
})
export class InicioComponent implements OnInit, OnDestroy {
  indiceActual: number = 0;
  slides: Slide[] = [
    { src: 'car1.jpg', alt: 'Gimnasio Eter Gym' },
    { src: 'mapa.jpg', alt: 'Equipos de Entrenamiento' },
    { src: 'eter.jpg', alt: 'Clases Personalizadas' }
  ];
  
  planes: Plan[] = [];
  mostrarPlanes: boolean = false;
  mostrarFormulario: boolean = true;
  intervaloCarrusel: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerPlanes();
    this.iniciarCarruselAutomatico();
  }

  ngOnDestroy() {
    this.detenerCarruselAutomatico();
  }

  iniciarCarruselAutomatico() {
    this.intervaloCarrusel = setInterval(() => {
      this.siguiente();
    }, 3000); // Cambia cada 3 segundos
  }

  detenerCarruselAutomatico() {
    if (this.intervaloCarrusel) {
      clearInterval(this.intervaloCarrusel);
      this.intervaloCarrusel = null;
    }
  }

  reiniciarCarruselAutomatico() {
    this.detenerCarruselAutomatico();
    this.iniciarCarruselAutomatico();
  }

  anterior() {
    if (this.slides.length > 0) {
      this.indiceActual = (this.indiceActual - 1 + this.slides.length) % this.slides.length;
      this.reiniciarCarruselAutomatico(); // Reinicia el timer cuando se navega manualmente
    }
  }

  siguiente() {
    if (this.slides.length > 0) {
      this.indiceActual = (this.indiceActual + 1) % this.slides.length;
    }
  }

  obtenerPlanes() {
    this.http.get<Plan[]>('assets/planes.json').subscribe({
      next: (data) => {
        this.planes = data.slice(0, 3); // Toma solo los primeros 3 planes
        this.mostrarPlanes = true;
      },
      error: (error) => {
        console.error('Error al cargar planes:', error);
        // Cargar planes por defecto si hay error
        this.planes = [
          {
            nombre: 'Plan Básico',
            descripcion: 'Acceso al gimnasio durante horario regular',
            precio: 500,
            duracion: '1 mes'
          },
          {
            nombre: 'Plan Premium',
            descripcion: 'Acceso ilimitado + clases grupales',
            precio: 800,
            duracion: '1 mes'
          },
          {
            nombre: 'Plan VIP',
            descripcion: 'Acceso total + entrenador personal',
            precio: 1500,
            duracion: '1 mes'
          }
        ];
        this.mostrarPlanes = true;
      }
    });
  }

  guardarEnLocalStorage(indice: number) {
    if (this.planes && this.planes[indice - 1]) {
      const plan = this.planes[indice - 1];
      const planSeleccionado = {
        nombre: plan.nombre,
        descripcion: plan.descripcion,
        precio: plan.precio.toString(),
        duracion: plan.duracion
      };
      localStorage.setItem('planSeleccionado', JSON.stringify(planSeleccionado));
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Plan seleccionado!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  agregarMensaje(mensaje: { nombre: string, email: string, asunto: string, mensaje: string }) {
    const mensajesGuardados = localStorage.getItem('mensajesContacto');
    let mensajesArray = mensajesGuardados ? JSON.parse(mensajesGuardados) : [];

    mensajesArray.push(mensaje);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajesArray));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Formulario enviado con éxito!",
      showConfirmButton: false,
      timer: 1000
    });
  }
}