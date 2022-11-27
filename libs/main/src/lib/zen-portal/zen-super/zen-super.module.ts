import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { ZenComponentsModule } from '@zen/components';

import { ZenSampleSubscriptionComponent } from './zen-sample-subscription/zen-sample-subscription.component';
import { ZenSampleUploadComponent } from './zen-sample-upload/zen-sample-upload.component';
import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';
import { ZenSuperRoutingModule } from './zen-super-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    ZenComponentsModule,
    ZenSuperRoutingModule,
  ],
  declarations: [ZenSuperPageComponent, ZenSampleSubscriptionComponent, ZenSampleUploadComponent],
})
export class ZenSuperModule {}
