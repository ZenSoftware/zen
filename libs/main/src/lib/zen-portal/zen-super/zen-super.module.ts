import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ZenComponentsModule } from '@zen/components';

import { ZenSampleSubscriptionComponent } from './zen-sample-subscription/zen-sample-subscription.component';
import { ZenSampleUploadComponent } from './zen-sample-upload/zen-sample-upload.component';
import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';
import { ZenSuperRoutingModule } from './zen-super-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    ZenComponentsModule,
    ZenSuperRoutingModule,
  ],
  declarations: [ZenSuperPageComponent, ZenSampleSubscriptionComponent, ZenSampleUploadComponent],
})
export class ZenSuperModule {}
