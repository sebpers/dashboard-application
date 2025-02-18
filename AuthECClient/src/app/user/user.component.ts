import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  animations: [
    trigger('routerFadeIn', [
      // Whenever children route is changed, animation will be executed
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.3s ease-in-out', style({ opacity: 1 })),
          ],
          { optional: true } // Won't get error if there is no component to render
        ),
      ]),
    ]),
  ],
})
export class UserComponent {
  // Get children routes
  constructor(private context: ChildrenOutletContexts) {}

  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
