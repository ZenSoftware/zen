import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { GqlErrors, UploadSampleGQL, parseGqlErrors } from '@zen/graphql';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'zen-upload-sample',
  templateUrl: 'zen-upload-sample.component.html',
})
export class ZenUploadSampleComponent {
  @ViewChild('fileInput', { static: true })
  fileInput?: ElementRef<HTMLInputElement>;
  localFileName: string | null = '';
  isUploading = false;

  constructor(private uploadSampleGQL: UploadSampleGQL) {}

  fileChange() {
    this.localFileName = this.file ? this.file.name : '';
  }

  get file() {
    return (<any>this.fileInput?.nativeElement).files[0];
  }
  private reset() {
    this.localFileName = null;
    (<any>this.fileInput?.nativeElement).value = null;
  }

  upload() {
    this.isUploading = true;

    this.uploadSampleGQL
      .mutate({
        file: this.file,
      })
      .pipe(catchError(parseGqlErrors))
      .subscribe({
        next: ({ data }) => {
          console.log('Done uploading', data?.sampleUpload);
          this.isUploading = false;
          this.reset();
        },

        error: (errors: GqlErrors) => {
          this.isUploading = false;
          alert('File upload failed' + JSON.stringify(errors));
        },
      });
  }
}
