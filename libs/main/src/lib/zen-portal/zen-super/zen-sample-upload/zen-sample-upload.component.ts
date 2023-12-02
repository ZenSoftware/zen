import { NgClass } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ZenLoadingComponent, ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { SampleUploadGQL } from '@zen/graphql';
import gql from 'graphql-tag';

gql`
  mutation SampleUpload($file: Upload!) {
    sampleUpload(file: $file)
  }
`;

@Component({
  selector: 'zen-sample-upload',
  styleUrl: 'zen-sample-upload.component.scss',
  templateUrl: 'zen-sample-upload.component.html',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, NgClass, ZenLoadingComponent, ZenSnackbarModule],
})
export class ZenSampleUploadComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  fileName = '';
  isUploading = false;

  constructor(
    private snackbar: MatSnackBar,
    private snackbarError: ZenSnackbarError,
    private sampleUploadGQL: SampleUploadGQL
  ) {}

  get file() {
    return this.fileInput.nativeElement.files?.[0];
  }

  fileChange() {
    this.fileName = this.file ? this.file.name : '';
  }

  private reset() {
    this.fileName = '';
    (<any>this.fileInput.nativeElement).value = null;
  }

  upload() {
    this.isUploading = true;

    this.sampleUploadGQL
      .mutate({
        file: this.file,
      })
      .subscribe({
        next: () => {
          this.isUploading = false;
          this.snackbar.open(`Uploaded: ${this.fileName}`, undefined, { duration: 3000 });
          this.reset();
        },

        error: e => {
          this.isUploading = false;
          this.snackbarError.open(e);
        },
      });
  }
}
