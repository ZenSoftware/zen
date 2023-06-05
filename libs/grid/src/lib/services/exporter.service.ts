import { Injectable } from '@angular/core';
import { Parser } from '@json2csv/plainjs';
import { encodeBase64, saveAs } from '@progress/kendo-file-saver';
import { merge } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class ExporterService {
  exportCSV(config: { data: object | object[]; filename: string; fields?: string[] }) {
    try {
      const parser = new Parser({ fields: config.fields });
      const csv = parser.parse(config.data);
      const dataURI = 'data:text/plain;base64,' + encodeBase64(csv);
      saveAs(dataURI, config.filename);
    } catch (err) {
      console.error(err);
    }
  }

  exportJSON(config: { data: object | object[]; filename: string; fields: string[] }) {
    try {
      const redactedData = this.redactData(config.data, config.fields);
      const content = JSON.stringify(redactedData, null, 2);
      const dataURI = 'data:text/plain;base64,' + encodeBase64(content);
      saveAs(dataURI, config.filename);
    } catch (err) {
      console.error(err);
    }
  }

  getValueFromPath(path: string, data: any) {
    const pathSplit = path.split('.');

    if (pathSplit.length === 1) {
      return data[path];
    } else {
      let next: any = data;
      for (let i = 0; i < pathSplit.length; i++) {
        next = next[pathSplit[i]];
        if (pathSplit.length - 1 === i) return next;
      }
    }
  }

  redactData(data: any, fields: string[]) {
    const redactedData: object[] = [];
    for (const row of data) {
      const redactedRow: Record<string, unknown> = {};

      for (const field of fields) {
        const fieldSplit = field.split('.');
        let next: any = {};
        const topReference = next;

        if (fieldSplit.length > 1) {
          for (let i = 0; i < fieldSplit.length; i++) {
            const fieldToken = fieldSplit[i];

            if (i === fieldSplit.length - 1) {
              next[fieldToken] = this.getValueFromPath(field, row);
            } else {
              next[fieldToken] = {};
              next = next[fieldToken];
            }
          }

          merge(redactedRow, topReference);
        } else {
          redactedRow[field] = (<any>row)[field];
        }
      }

      redactedData.push(redactedRow);
    }
    return redactedData;
  }
}
