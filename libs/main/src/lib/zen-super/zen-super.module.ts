import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ZenSuperPageComponent } from './zen-super-page/zen-super-page.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, MatButtonModule],
  declarations: [ZenSuperPageComponent],
})
export class ZenSuperModule {}
