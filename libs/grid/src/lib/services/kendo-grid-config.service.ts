import { Injectable } from '@angular/core';
import {
  CheckboxColumnComponent,
  CommandColumnComponent,
  GridComponent,
} from '@progress/kendo-angular-grid';

import { KendoGridColumnSettings } from './kendo-grid-column-settings.interface';
import { KendoGridSettings } from './kendo-grid-settings.interface';
import { StatePersistingService } from './state-persisting.service';

@Injectable({
  providedIn: 'root',
})
export class KendoGridSettingsService {
  constructor(private statePersistingService: StatePersistingService) {}

  get(token: string) {
    const gridSettings = this.statePersistingService.get(token) as KendoGridSettings<any>;
    if (gridSettings) return this.mapGridSettings(gridSettings);
    else return null;
  }

  save(token: string, grid: GridComponent, gridSettings: KendoGridSettings<any>): void {
    const gridConfig = { ...gridSettings };

    const columnState = grid.columns
      .toArray()
      .filter(
        item =>
          !(item instanceof CommandColumnComponent) && !(item instanceof CheckboxColumnComponent)
      )
      .map((item: any) =>
        Object.keys(item)
          .filter(propName => !propName.toLowerCase().includes('template'))
          .reduce(
            (acc, curr) => ({ ...acc, ...{ [curr]: item[curr] } }),
            <KendoGridColumnSettings<any>>{}
          )
      )
      .map(col => {
        const prev = gridConfig.columnsConfig.find(p => p.field === col.field);
        if (prev) col.custom = prev.custom;
        return col;
      });

    gridConfig.columnsConfig = columnState;

    this.statePersistingService.save(token, gridConfig);
  }

  private mapGridSettings(gridSettings: KendoGridSettings<any>): KendoGridSettings<any> {
    const result = { ...gridSettings };

    result.columnsConfig = gridSettings.columnsConfig.sort(
      (a: KendoGridColumnSettings<any>, b: KendoGridColumnSettings<any>) =>
        <number>a.orderIndex - <number>b.orderIndex
    );

    return result;
  }
}
