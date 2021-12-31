import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZenSnackbarErrorService } from '@zen/components';
import { GqlErrors, SampleUploadGQL, parseGqlErrors } from '@zen/graphql';
import gql from 'graphql-tag';
import { catchError } from 'rxjs/operators';

gql`
  mutation SampleUpload($file: Upload!) {
    sampleUpload(file: $file)
  }
`;

@Component({
  selector: 'zen-sample-upload',
  templateUrl: 'zen-sample-upload.component.html',
})
export class ZenSampleUploadComponent {
  @ViewChild('fileInput', { static: true })
  fileInput?: ElementRef<HTMLInputElement>;
  localFileName: string | null = '';
  isUploading = false;

  constructor(
    private snackbar: MatSnackBar,
    private sampleUploadGQL: SampleUploadGQL,
    private snackbarError: ZenSnackbarErrorService
  ) {}

  get file() {
    return (<any>this.fileInput?.nativeElement).files[0];
  }

  fileChange() {
    this.localFileName = this.file ? this.file.name : '';
  }

  private reset() {
    this.localFileName = null;
    (<any>this.fileInput?.nativeElement).value = null;
  }

  upload() {
    this.isUploading = true;

    this.sampleUploadGQL
      .mutate({
        file: this.file,
      })
      .pipe(catchError(parseGqlErrors))
      .subscribe({
        next: () => {
          this.isUploading = false;
          this.snackbar.open('Uploaded', undefined, { duration: 2000 });
          this.reset();
        },

        error: (errors: GqlErrors) => {
          this.isUploading = false;
          this.snackbarError.open(errors);
        },
      });
  }
}
