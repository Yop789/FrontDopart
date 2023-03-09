import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  inactivityTimer:any = null;
  inactivityTime = 900000; // 15 minutos en milisegundos

  constructor() { }

  resetTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      // Aquí va la lógica para enviar el mensaje
      alert('¡Ha estado inactivo durante 15 minutos!');
    }, this.inactivityTime);
  }

  startTimer() {
    document.addEventListener('mousemove', () => this.resetTimer());
    document.addEventListener('mousedown', () => this.resetTimer());
    document.addEventListener('keydown', () => this.resetTimer());
    document.addEventListener('scroll', () => this.resetTimer());

    this.resetTimer();
  }

  stopTimer() {
    document.removeEventListener('mousemove', () => this.resetTimer());
    document.removeEventListener('mousedown', () => this.resetTimer());
    document.removeEventListener('keydown', () => this.resetTimer());
    document.removeEventListener('scroll', () => this.resetTimer());
    clearTimeout(this.inactivityTimer);
  }
}

