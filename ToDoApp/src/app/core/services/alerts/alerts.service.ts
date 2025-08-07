import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private navigationService: NavigationService) { }

  showBasicIconAlert(icon: SweetAlertIcon = 'info', title: string = 'Info', message: string = 'message') {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#ea580c'
    });
  }

  showConfirmAndNavigate(icon: SweetAlertIcon = 'info', title: string = 'title', message: string = 'message', path: string = "/login") {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#ea580c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.navigationService.navigateTo(path);
      }
    });
  }
}
