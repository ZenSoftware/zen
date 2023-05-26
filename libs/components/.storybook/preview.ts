import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Preview, moduleMetadata } from '@storybook/angular';
import { Environment, EnvironmentDev } from '@zen/common';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: Environment, useValue: EnvironmentDev },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
      ],
    }),
  ],
};

export default preview;
