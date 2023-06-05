import { Injectable } from '@angular/core';
import { Parser } from '@json2csv/plainjs';
import { encodeBase64, saveAs } from '@progress/kendo-file-saver';

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

  exportJSON(config: { data: object | object[]; filename: string }) {
    try {
      const content = JSON.stringify(config.data, null, 2);
      const dataURI = 'data:text/plain;base64,' + encodeBase64(content);
      saveAs(dataURI, config.filename);
    } catch (err) {
      console.error(err);
    }
  }
}
