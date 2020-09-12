export function extractGraphQLErrors(errors: any): Array<any> {
  if (errors && errors.graphQLErrors) {
    return errors.graphQLErrors.reduce((results: any[], item: any) => {
      if (item?.extensions?.exception?.response) {
        results.push(item?.extensions?.exception?.response);
      }
      return results;
    }, []);
  }
  return [];
}
