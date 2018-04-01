import { noop } from './util';

describe('noop', () => {
  it('returns null', () => {
    const result = noop();

    expect(result).toBeNull();
  });
});
