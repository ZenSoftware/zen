import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

type ExtendedConfig = {
  /**
   * The error message to be displayed to the user
   * @default 'ERROR'
   */
  message?: string;

  /**
   * Log to `console.error()`
   * @default true
   */
  log?: boolean;

  /**
   * Enables copy to clipboard
   * @default true
   */
  copyable?: boolean;
};

@Injectable()
export class ZenSnackbarError implements OnDestroy {
  #subs: Subscription[] = [];

  constructor(private snackBar: MatSnackBar) {}

  open(error: unknown, config?: MatSnackBarConfig & ExtendedConfig) {
    const mergedConfig: MatSnackBarConfig & ExtendedConfig = {
      // Default options
      panelClass: 'snackbar-error',
      duration: 5000,

      // Extended options
      message: 'ERROR',
      log: true,
      copyable: true,
    };

    Object.assign(mergedConfig, config);

    if (mergedConfig.log) console.error(error);

    let snackBarRef;
    if (!mergedConfig.copyable) {
      snackBarRef = this.snackBar.open(mergedConfig.message ?? '', 'X', mergedConfig);
    } else {
      snackBarRef = this.snackBar.open(mergedConfig.message ?? '', 'Copy', mergedConfig);

      const sub = snackBarRef.onAction().subscribe(() => {
        let clipboardText = '';
        if (typeof error === 'string') {
          clipboardText = error;
        } else if (error && typeof error === 'object') {
          clipboardText = JSON.stringify(error, null, 2);
        }

        if (mergedConfig.message) {
          clipboardText = mergedConfig.message + '\n' + clipboardText;
        }

        navigator.clipboard.writeText(clipboardText.trim()).then();
      });

      this.#subs.push(sub);
    }
  }

  ngOnDestroy() {
    this.#subs.forEach(s => s.unsubscribe());
  }
}
