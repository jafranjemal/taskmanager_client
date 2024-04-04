import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private showAlertSubject = new Subject<{ message: string, type: 'success' | 'error' }>();

  showAlert$ = this.showAlertSubject.asObservable();

  constructor() { }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.showAlertSubject.next({ message, type });
    this.showSweetAlert(message, type);
  }

  private showSweetAlert(message: string, type: 'success' | 'error'): void {
    let icon: 'success' | 'error' = 'success';
    if (type === 'error') {
      icon = 'error';
    }

    Swal.fire({
      title: type === 'error' ? 'Error' : 'Success',
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
