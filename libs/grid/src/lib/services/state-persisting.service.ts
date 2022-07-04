import { Injectable } from '@angular/core';

import { KendoGridSettings } from './kendo-grid-settings.interface';

// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key: unknown, value: unknown) => {
//     if (typeof value === 'object' && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };

@Injectable({
  providedIn: 'root',
})
export class StatePersistingService {
  storage = new Map<string, any>();

  public get(token: string) {
    // const settings = localStorage.getItem(token);
    // return settings ? JSON.parse(settings) : settings;
    return this.storage.get(token);
  }

  public save(token: string, gridConfig: KendoGridSettings<any>): void {
    this.storage.set(token, gridConfig);
    // try {
    //   localStorage.setItem(token, JSON.stringify(gridConfig, getCircularReplacer()));
    // } catch (error) {
    //   console.warn(error);
    // }
  }
}
