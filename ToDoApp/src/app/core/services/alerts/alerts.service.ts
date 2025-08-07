import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  showBasicIconAlert(icon: SweetAlertIcon = 'info', title: string = 'Info', message: string = '') {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#ea580c'
    });
  }
}
