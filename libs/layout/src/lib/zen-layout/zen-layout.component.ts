import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-layout',
  templateUrl: './zen-layout.component.html',
})
export class ZenLayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.drawer.close();
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
