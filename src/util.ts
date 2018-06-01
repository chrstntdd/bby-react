import { Maybe } from '@/fp';

export const noop = (): void => {};

export const validateInput = (errMsg: string, pattern: RegExp) => (v: string): Maybe<string> =>
  pattern.test(v) ? Maybe.nothing() : Maybe.just(errMsg);

export const timeout = (ms: number): Promise<NodeJS.Timer> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const debounce = (fn: any, delay: number) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = delay;
    }, delay);
  };
};

export const getFirstQueryParamVal = (): string =>
  window.location.search
    .split('?')[1] /* Grab everything after the ? */
    .split('&')[0] /* Only parse the first queryParam */
    .split('=')[1]; /* Grab the first queryParam value */

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or its first item
 */
export const unwrapArray = (arg: any, defaultValue?: any): any => {
  arg = Array.isArray(arg) ? arg[0] : arg;
  return !arg && defaultValue ? defaultValue : arg;
};
