import { EstadoBr } from './../models/estado-br.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }


  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/estadosbr.json').pipe(
      map(estado => estado)
    );
  }
}
