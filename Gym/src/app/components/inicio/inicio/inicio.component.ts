import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  indiceActual: number = 0;
  totalImagenes: number = 3;

  constructor(private http: HttpClient) {
    this.obtenerPlanes();
  }

  obtenerPlanes() {
    this.http.get<any[]>('planes.json').subscribe((data) => {
      if (data.length >= 3) {
        document.getElementById('nombre1')!.textContent = data[0].nombre;
        document.getElementById('descripcion1')!.textContent = data[0].descripcion;
        document.getElementById('precio1')!.textContent = data[0].precio.toString();
        document.getElementById('duracion1')!.textContent = data[0].duracion;

        document.getElementById('nombre2')!.textContent = data[1].nombre;
        document.getElementById('descripcion2')!.textContent = data[1].descripcion;
        document.getElementById('precio2')!.textContent = data[1].precio.toString();
        document.getElementById('duracion2')!.textContent = data[1].duracion;

        document.getElementById('nombre3')!.textContent = data[2].nombre;
        document.getElementById('descripcion3')!.textContent = data[2].descripcion;
        document.getElementById('precio3')!.textContent = data[2].precio.toString();
        document.getElementById('duracion3')!.textContent = data[2].duracion;
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

  anterior() {
    this.indiceActual = this.indiceActual > 0 ? this.indiceActual - 1 : this.totalImagenes - 1;
    this.moverCarrusel();
  }

  siguiente() {
    this.indiceActual = this.indiceActual < this.totalImagenes - 1 ? this.indiceActual + 1 : 0;
    this.moverCarrusel();
  }

  moverCarrusel() {
    const carrusel = document.getElementById('carrusel');
    if (carrusel) {
      carrusel.style.transform = `translateX(-${this.indiceActual * 100}%)`;
    }
  }
}
