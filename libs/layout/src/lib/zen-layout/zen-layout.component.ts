import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-layout',
  templateUrl: './zen-layout.component.html',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, NgIf],
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
