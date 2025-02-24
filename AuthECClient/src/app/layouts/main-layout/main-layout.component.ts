import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../../shared/utils/claimReq-utils';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, HideIfClaimsNotMetDirective],
  standalone: true,
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  claimReq = claimReq;

  constructor(private router: Router, private authService: AuthService) {}

  onLogout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/signin');
  }
}
