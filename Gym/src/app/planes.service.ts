import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  // Constructor para inyectar el HttpClient
  constructor(private http: HttpClient) { }

  // Método para obtener los planes desde el archivo JSON
  obtenerPlanes(): Observable<any> {
    return this.http.get('assets/planes.json');  // URL al archivo JSON
  }
}
