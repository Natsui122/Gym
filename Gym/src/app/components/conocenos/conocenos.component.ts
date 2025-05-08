import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conocenos',
  standalone: true,
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css'],
})
export class ConocenosComponent {
  indiceActual: number = 0;
  totalImagenes: number = 3;
  @ViewChild('entrenadoresContainer', { static: false }) entrenadoresContainer!: ElementRef;

  entrenadores: any[] = [];
  mostrarFormulario: boolean = false;

  constructor(private http: HttpClient) {
    this.obtenerEntrenadores();
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
      const carruselWidth = carrusel.offsetWidth;
      const desplazamiento = this.indiceActual * carruselWidth;
      carrusel.style.transform = `translateX(-${desplazamiento}px)`;
    }
  }
  

  obtenerEntrenadores() {
    this.http.get<any[]>('entrenadores.json').subscribe((data) => {
      this.entrenadores = data;
      this.generarEntrenadores();
    });
  }

  generarEntrenadores() {
    if (this.entrenadoresContainer) {
      this.entrenadoresContainer.nativeElement.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos elementos

      this.entrenadores.forEach((entrenador, index) => {
        const div = document.createElement('div');
        div.classList.add('bg-gray-800', 'p-4', 'rounded');

        const h3 = document.createElement('h3');
        h3.classList.add('text-green-400');
        h3.innerText = `Entrenador ${index + 1}`;

        const p = document.createElement('p');
        p.classList.add('text-gray-400');
        p.innerText = entrenador?.especialidad || 'Especialidad no disponible';

        div.appendChild(h3);
        div.appendChild(p);
        this.entrenadoresContainer.nativeElement.appendChild(div);
      });
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  enviarCorreo(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const correo = (form.querySelector('input[type="email"]') as HTMLInputElement).value;
    const mensaje = (form.querySelector('textarea') as HTMLTextAreaElement).value;

    console.log('Correo:', correo);
    console.log('Mensaje:', mensaje);

    this.toggleFormulario();
    alert('Correo enviado con éxito');
  }
}
