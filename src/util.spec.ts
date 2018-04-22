import { noop } from './util';

describe('noop', () => {
  it('is void', () => {
    const result = noop();

    expect(result).toBeUndefined();
  });
});
