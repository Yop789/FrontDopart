import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private activity$ = new Subject();
  private idle$ = this.activity$.pipe(
    debounceTime(120000), // Espera 2 minutos antes de continuar
    distinctUntilChanged(), // Ignora eventos duplicados
    filter(() => !this.userIsActive), // Filtra solo si el usuario está inactivo
    map(() => true), // Convierte la secuencia en verdadero cuando el usuario está inactivo
    shareReplay({ refCount: true, bufferSize: 1 }) // Comparte la secuencia y solo mantiene el último valor
  );
  private userIsActive = true;
  public userActivity() {
    this.activity$.next(true);
    this.userIsActive = true;
}
public isIdle(): Observable<boolean> {
  return this.idle$.pipe(
      tap(() => this.userIsActive = false),
      switchMap(() => this.idle$),
      takeUntil(this.activity$)
  );
}
  constructor() {}
}
