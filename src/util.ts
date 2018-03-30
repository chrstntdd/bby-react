export const noop = () => '';

export const timeout = (ms: number): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, ms));
