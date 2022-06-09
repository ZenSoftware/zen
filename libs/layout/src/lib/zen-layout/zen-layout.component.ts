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
  isMobile = false;
  #subs: Subscription[] = [];

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    const routerSub = router.events.subscribe((event: Event) => {
      if (this.isMobile && event instanceof NavigationStart) {
        this.drawer.close();
      }
    });
    this.#subs.push(routerSub);

    const isHandsetSub = this.isHandset$.subscribe();
    this.#subs.push(isHandsetSub);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => {
      this.isMobile = result.matches;
      return this.isMobile;
    }),
    shareReplay()
  );

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
