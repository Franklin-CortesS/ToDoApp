import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-logout',
  imports: [],
  standalone: true,
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout implements OnInit {

  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.showConfirmAndNavigate('info', 'Logged Out', 'You have been logged out successfully.', "/login");
  }
}
