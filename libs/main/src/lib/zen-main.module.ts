import { NgModule } from '@angular/core';

import { ZenMainRoutingModule } from './zen-main-routing.module';
import { ZenNotFoundComponent } from './zen-not-found/zen-not-found.component';

@NgModule({
  imports: [ZenMainRoutingModule],
  declarations: [ZenNotFoundComponent],
})
export class ZenMainModule {}
