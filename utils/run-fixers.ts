import { fmt, path } from '../deps.ts';
import { ensureDir } from './ensure-dir.ts';

import type { FixerFunction, Platform } from '../types.d.ts';
import { writeJsonConfig } from "./config-utils.ts";

const { bold, green, magenta } = fmt;

// Nonsense
const fixersDir = path.normalize(
  path.join(
    path.dirname(path.fromFileUrl(Deno.mainModule)),
    `./fixers`
  )
);

async function ensurePath(target: string) {
  const basePath = path.dirname(target);

  return await ensureDir(basePath);
}

export async function runFixers(from: Platform, to: Platform, outDir: string) {
  const dir = Deno.readDir(fixersDir);

  for await (const entry of dir) {
    if (
      entry.isFile &&
      entry.name.endsWith('.ts') &&
      !entry.name.endsWith('example.ts')
    ) {
      console.log('');

      const imported = await import(`${fixersDir}/${entry.name}`);
      const run = imported.run as FixerFunction;
      const filename = imported.filename as string;

      console.log(`Running fixer: ${bold(green(entry.name))}`);

      const config = await run(from, to);

      const target = `${outDir}/${filename}`;
      await ensurePath(target);

      // Only try to write if the returned config is truthy
      // Do remember that empty arrays and objects are considered truthy, e.g.
      // `Boolean({}) === Boolean([]) === true`
      if (config) {
        if (typeof config === 'string') {
          await Deno.writeTextFile(target, config);
        } else {
          await writeJsonConfig(target, config);
        }

        console.log(`Wrote file ${bold(magenta(target))}`);
      }
    }
  }
}
