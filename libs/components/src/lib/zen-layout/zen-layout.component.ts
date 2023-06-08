import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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

    const breakpointSub = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        tap(state => {
          this.isMobile = state.matches;
        })
      )
      .subscribe();
    this.#subs.push(breakpointSub);
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
