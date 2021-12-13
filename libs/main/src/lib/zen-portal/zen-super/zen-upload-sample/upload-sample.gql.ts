import gql from 'graphql-tag';

export const UPLOAD_SAMPLE = gql`
  mutation UploadSample($file: Upload!) {
    sampleUpload(file: $file)
  }
`;
