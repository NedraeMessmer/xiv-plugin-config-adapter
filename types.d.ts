export type Platform = 'linux' | 'darwin';

// deno-lint-ignore no-explicit-any
export type FixerFunction = (from: Platform, to: Platform) => Promise<any>;
