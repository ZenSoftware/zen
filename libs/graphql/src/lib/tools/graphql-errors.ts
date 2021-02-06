import { throwError } from 'rxjs';

export const parseGqlErrors = (errors: any) => throwError(new GqlErrors(errors));

export class GqlErrors {
  parsed: any[] = [];
  original: any;

  constructor(errors: any) {
    this.original = errors;
    this.parsed = GqlErrors.extractGraphQLErrors(errors);
  }

  static extractGraphQLErrors(errors: any): Array<any> {
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

  find(predicate: (value: any, index: number, obj: any[]) => unknown) {
    return this.parsed.find(predicate);
  }

  get hasThrottleError(): boolean {
    return !!this.parsed.find(e => e === 'ThrottlerException: Too Many Requests');
  }
}
