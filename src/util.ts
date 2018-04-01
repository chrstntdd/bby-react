import { Maybe } from '@/fp';

export const noop = (): null => null;

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
