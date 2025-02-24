import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { HideIfClaimsNotMetDirective } from '../shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../shared/utils/claimReq-utils';

@Component({
  selector: 'app-dashboard',
  imports: [HideIfClaimsNotMetDirective],
  templateUrl: './dashboard.component.html',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  fullName: string = '';
  claimReq = claimReq;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res: any) => {
        this.fullName = res.fullName;
      },
      error: (err: any) => {
        console.error(
          'ERROR: \n Error while retrieving user profile. \n ' + err
        );
      },
    });
  }
}
