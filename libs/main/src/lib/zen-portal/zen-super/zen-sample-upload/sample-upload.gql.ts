import gql from 'graphql-tag';

export const SAMPLE_UPLOAD = gql`
  mutation SampleUpload($file: Upload!) {
    sampleUpload(file: $file)
  }
`;
