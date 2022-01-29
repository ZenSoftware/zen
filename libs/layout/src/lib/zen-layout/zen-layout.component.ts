import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-layout',
  templateUrl: './zen-layout.component.html',
})
export class ZenLayoutComponent implements OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  #sub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.#sub = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.drawer.close();
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnDestroy() {
    if (this.#sub) this.#sub.unsubscribe();
  }
}
