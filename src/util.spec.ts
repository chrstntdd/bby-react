import { noop } from './util';

describe('noop', () => {
  it('returns an empty string', () => {
    const result = noop();

    expect(result).toBe('');
  });
});
