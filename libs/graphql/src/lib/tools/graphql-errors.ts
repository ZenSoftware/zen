import { throwError } from 'rxjs';
export { ApiError } from '@zen/api-interfaces';

export const parseGqlErrors = (errors: any) => throwError(new GqlErrors(errors));

export class GqlErrors<T = any> {
  parsed: T[] = [];
  original: any;

  constructor(errors: any) {
    this.original = errors;
    this.parsed = GqlErrors.extractGraphQLErrors(errors);
  }

  static extractGraphQLErrors(errors: any): Array<any> {
    if (errors?.graphQLErrors) {
      return errors.graphQLErrors.reduce((results: any[], item: any) => {
        const error = item?.extensions?.exception?.response;
        if (error) results.push(error);

        return results;
      }, []);
    }
    return [];
  }

  /**
   * Returns the value of the first error where predicate is true, and undefined otherwise.
   */
  find(predicate: (value: T, index: number, obj: T[]) => unknown) {
    return this.parsed.find(predicate);
  }

  get hasThrottleError(): boolean {
    return !!this.parsed.find((e: any) => e === 'ThrottlerException: Too Many Requests');
  }
}
