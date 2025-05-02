import { Component, Input} from '@angular/core';
import { UsuarioEstadoService } from '../../servicio/estado/usuario-estado.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario: string = '';

  constructor(private usuarioEstadoService : UsuarioEstadoService) { }

  ngOnInit() {
    this.usuarioEstadoService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

}
