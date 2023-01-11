import { ApiError } from '@zen/api-interfaces';
import { throwError } from 'rxjs';

type UnparsedError<T> = {
  extensions?: {
    code?: string;
    exception?: { response?: T };
  };
};
type ErrorResponse<T> = { graphQLErrors: UnparsedError<T>[] };

/**
 * Parses GraphQL errors and returns a `GqlErrors` object.
 *
 * @example
 * ```ts
 * login(data: AuthLoginInput) {
 *   return this.authLoginGQL
 *     .fetch({ data }, { fetchPolicy: 'no-cache' })
 *     .pipe(catchError(parseGqlErrors))
 *     .subscribe({
 *       error: (errors: GqlErrors<ApiError.AuthLogin>) => {
 *         if (errors.find(e => e === 'INCORRECT_PASSWORD')) {
 *           // Handle incorrect password
 *         }
 *       },
 *     });
 * }
 * ```
 */
export function parseGqlErrors(errors: ErrorResponse<unknown>) {
  return throwError(() => new GqlErrors(errors));
}

export class GqlErrors<T = any> {
  parsed: T[] = [];
  original: ErrorResponse<T>;

  constructor(errors: ErrorResponse<T>) {
    this.original = errors;
    this.parsed = this.extractGraphQLErrors(errors);
  }

  extractGraphQLErrors(errors: ErrorResponse<T>): Array<T> {
    if (errors?.graphQLErrors) {
      return errors.graphQLErrors.reduce((results: T[], item) => {
        const error = item?.extensions?.exception?.response;

        if (error !== undefined) results.push(error);

        return results;
      }, []);
    }

    return [];
  }

  /**
   * Returns the value of the first error where predicate is true and undefined otherwise.
   */
  find(predicate: (value: T, index: number, obj: T[]) => unknown) {
    return this.parsed.find(predicate);
  }

  get hasThrottleError(): boolean {
    return !!this.parsed.find((e: unknown) => e === ApiError.Nest.THROTTLE);
  }
}
