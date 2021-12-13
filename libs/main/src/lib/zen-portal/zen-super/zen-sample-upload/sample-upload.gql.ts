import gql from 'graphql-tag';

export const UPLOAD_SAMPLE = gql`
  mutation SampleUpload($file: Upload!) {
    sampleUpload(file: $file)
  }
`;
