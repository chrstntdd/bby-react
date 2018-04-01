export enum MaybeType {
  Nothing,
  Just
}

/* For 'pattern matching' on the caseOf the maybe */
export interface MaybePatterns<T, U> {
  just: (t: T) => U;

  nothing: () => U;
}

/* Public util function to create a Maybe type */
export const maybe = <T>(t: T): Maybe<T> => Maybe.maybe(t);

export type OptionalMaybePatterns<T, U> = Partial<MaybePatterns<T, U>>;

export class Maybe<T> {
  private constructor(private type: MaybeType, private value?: T) {}

  static maybe<T>(t?: T | null): Maybe<T> {
    return t === null || t === undefined
      ? new Maybe<T>(MaybeType.Nothing)
      : new Maybe<T>(MaybeType.Just, t);
  }

  static just<T>(t: T) {
    if (t === null || t === undefined) {
      throw new TypeError('Cannot Maybe.just(null)');
    }
    return new Maybe<T>(MaybeType.Just, t);
  }

  static nothing<T>() {
    return new Maybe<T>(MaybeType.Nothing);
  }

  static isJust<T>(t: Maybe<T>): boolean {
    return t.type === MaybeType.Just;
  }

  static isNothing<T>(t: Maybe<T>): boolean {
    return t.type === MaybeType.Nothing;
  }

  toMaybe<U>(u: U) {
    return Maybe.maybe<U>(u);
  }

  chain = this.bind;
  bind<U>(f: (t: T) => Maybe<U>) {
    return this.type === MaybeType.Just ? f(this.value) : Maybe.nothing<U>();
  }

  caseOf<U>(patterns: MaybePatterns<T, U>) {
    return this.type === MaybeType.Just ? patterns.just(this.value) : patterns.nothing();
  }

  /* Provide a default value, turning an optional value into a normal value. */
  withDefault<U extends T>(defaultValue: U): T | U {
    return this.type === MaybeType.Just ? this.value : defaultValue;
  }

  /* Apply a function to the Maybe */
  lift = this.fMap;
  map = this.fMap;
  fMap<U>(f: (t: T) => U) {
    return this.bind(v => this.toMaybe<U>(f(v)));
  }

  /* Execute a function based on the content of the Maybe. 
     Returns the original value. Meant for side effects!
  */
  do(patterns: Partial<MaybePatterns<T, void>> = {}): Maybe<T> {
    const noop = {
      just: (t: T) => {},
      nothing: () => {}
    };
    const merged = Object.assign(noop, patterns);
    this.caseOf(merged);
    return this;
  }
}
