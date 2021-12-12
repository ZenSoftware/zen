import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ZenComponentsModule } from '@zen/components';

import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';
import { ZenSuperRoutingModule } from './zen-super-routing.module';
import { ZenUploadSampleComponent } from './zen-upload-sample/zen-upload-sample.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    ZenComponentsModule,
    ZenSuperRoutingModule,
  ],
  declarations: [ZenSuperPageComponent, ZenUploadSampleComponent],
})
export class ZenSuperModule {}
