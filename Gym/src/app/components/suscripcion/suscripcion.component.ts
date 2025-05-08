import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Formulario2Component } from '../formulario2/formulario2.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscripcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Formulario2Component],
  templateUrl: './suscripcion.component.html'
})
export class SuscripcionComponent {
  clases: string[] = ['Yoga', 'Kickboxing', 'CrossFit', 'Pilates'];
  minFecha: string = new Date().toISOString().split('T')[0];
  suscripcionForm;
  datosParaFormulario2: any = null;

  constructor(private fb: FormBuilder) {
    this.suscripcionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      clase: ['', Validators.required],
      fecha: ['', Validators.required],
      publicidad: [false]
    });
  }

  enviar() {
    if (this.suscripcionForm.valid) {
      this.datosParaFormulario2 = this.suscripcionForm.value;
      // Opcional: resetear el formulario
      this.suscripcionForm.reset({ publicidad: false });
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Formulario enviado con éxito!",
              showConfirmButton: false,
              timer: 1500
            });
    }else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Formulario incompleto o inválido",
        text: "Por favor, completa todos los campos requeridos.",
        showConfirmButton: true,
      });
    }
  }
}