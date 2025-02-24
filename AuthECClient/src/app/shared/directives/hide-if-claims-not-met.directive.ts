import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]',
  standalone: true,
})
export class HideIfClaimsNotMetDirective implements OnInit {
  @Input('appHideIfClaimsNotMet') claimReq!: Function;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    const claims = this.authService.getClaims();
    // Hide element if claims not met
    if (!this.claimReq(claims)) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
