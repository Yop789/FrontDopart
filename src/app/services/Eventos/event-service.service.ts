import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EventService {

  private subject = new Subject<any>();

  emit(event: boolean) {
    this.subject.next({ event});
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
}
