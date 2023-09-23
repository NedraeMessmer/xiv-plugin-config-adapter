import { flags as f, path } from './deps.ts';
import { platform } from './utils/platform-check.ts';
import { runFixers } from "./utils/run-fixers.ts";

import type { Platform } from './types.d.ts';

const flags = f.parse(Deno.args, {
  string: ['from', 'to', 'output'],
  default: {
    to: platform(),
    output: `${Deno.cwd()}/out`,
  },
});

if (!flags.from) {
  console.info('Please specify a source platform (--from)');
  Deno.exit(65);
}

let normalizedPath = '';

if (path.isAbsolute(flags.output)) {
  normalizedPath = flags.output;
} else {
  normalizedPath = path.normalize(`${Deno.cwd()}/${flags.output}`);
}

await runFixers(
  flags.from as Platform,
  flags.to as Platform,
  normalizedPath,
);
