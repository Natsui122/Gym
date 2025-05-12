import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario1',
  imports: [FormsModule],
  templateUrl: './formulario1.component.html',
  styleUrl: './formulario1.component.css'
})
export class Formulario1Component {
  nombre: string = '';
  email: string = '';
  asunto: string = '';
  mensaje: string = '';
  //contacto: string [] = [];
  @Output() enviarFormulario = new EventEmitter<{nombre: string, email: string, asunto: string, mensaje: string}>();

  enviar() {
    if (this.formularioInvalido()) {
      return; // No hace nada si el formulario no es válido
    }
    //this.contacto.push(this.nombre, this.email, this.asunto, this.mensaje);
    this.enviarFormulario.emit({
      nombre: this.nombre,
      email: this.email,
      asunto: this.asunto,
      mensaje: this.mensaje
    });
    this.nombre = '';
    this.email = '';
    this.asunto = '';
    this.mensaje = '';
  }
  formularioInvalido(): boolean {
    return (
      !this.nombre || this.nombre.trim().length < 5 ||
      !this.email || !this.email.includes('@') ||
      !this.asunto || this.asunto.trim().length < 10 ||
      !this.mensaje || this.mensaje.trim().length < 20
    );
  }

  nombreTocado = false;
  emailTocado = false;
  asuntoTocado = false;
  mensajeTocado = false;
}
