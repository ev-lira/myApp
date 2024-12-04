import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WorldClockService {
    private apiUrl = 'https://worldtimeapi.org/api/timezone';
  
    constructor(private http: HttpClient) {}
  
    // Método para listar os fusos horários disponíveis
    getTimezones(): Observable<string[]> {
      return this.http.get<string[]>(this.apiUrl);
    }
  
    // Método para obter os dados de horário com base no fuso horário selecionado
    getTimeByTimezone(timezone: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${timezone}`);
    }
  }