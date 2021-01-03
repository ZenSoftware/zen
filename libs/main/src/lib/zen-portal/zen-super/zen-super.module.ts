import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';
import { ZenSuperRoutingModule } from './zen-super-routing.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatButtonModule, ZenSuperRoutingModule],
  declarations: [ZenSuperPageComponent],
})
export class ZenSuperModule {}
