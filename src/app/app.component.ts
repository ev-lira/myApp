import { Component, OnInit } from '@angular/core';
import { WorldClockService } from './world-clock.service';

@Component({
  selector: 'app-root',
  templateUrl: './world-clock.component.html',
  styleUrl: './world-clock.component.css'
})

export class WorldClockComponent implements OnInit {
  timezones: string[] = [];
  selectedTimezone: string = 'UTC';
  currentTime: string = '';
  currentDate: string = '';
  cityName: string = '';

  constructor(private worldClockService: WorldClockService) {}

  ngOnInit(): void {
    this.loadTimezones();
    this.updateTime(); // Atualiza inicialmente com UTC
  }

  // Carrega os fusos horários
  loadTimezones(): void {
    this.worldClockService.getTimezones().subscribe({
      next: (data) => {
        this.timezones = data;
      },
      error: (err) => console.error('Erro ao carregar fusos horários:', err),
    });
  }

  // Atualiza a hora e a data com base no fuso horário selecionado
  updateTime(): void {
    this.worldClockService.getTimeByTimezone(this.selectedTimezone).subscribe({
      next: (data) => {
        this.cityName = data.timezone;
        this.currentTime = data.datetime.split('T')[1].split('.')[0]; // Extrai a hora
        this.currentDate = data.datetime.split('T')[0]; // Extrai a data
      },
      error: (err) => console.error('Erro ao obter o horário:', err),
    });
  }
}