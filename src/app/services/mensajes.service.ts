import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    private modal: NzModalService
  ) { }


  showConfirm(): void {
    const modal = this.modal.success({
      nzTitle: 'La operacion se realisado correctamente',
      nzContent:
        'Sea realisado la orden correctamente verifica tu correo para ver los detalled de tu orden ',
      nzOkText: 'Ok',
      nzCentered: true,
    });

    setTimeout(() => modal.destroy(), 3000);
  }
}
