import { platform } from './platform-check.ts';
import { HOME, innerUserPath, launcherDataPath, outerUserPath } from './path-defs.ts';
import type { Platform } from '../types.d.ts';

export async function importJsonConfig(path: string) {
  const contents = await Deno.readTextFile(
    `${HOME}/${launcherDataPath[platform()]}/pluginConfigs/${path}`,
  );

  return JSON.parse(contents);
}

// deno-lint-ignore no-explicit-any
export async function writeJsonConfig(path: string, contents: Record<string, any>) {
  await Deno.writeTextFile(path, JSON.stringify(contents, null, 2));
  return path;
}

function isInnerWinePath(path: string) {
  return path.startsWith('C:\\');
}

function swapInnerPaths(from: Platform, to: Platform, path: string) {
  return path.replace(innerUserPath[from], innerUserPath[to]);
}

function swapOuterPaths(from: Platform, to: Platform, path: string) {
  const launcherPathFromWithBackslash = launcherDataPath[from].replace(/\//g, '\\');

  return path
    .replace(outerUserPath[from], outerUserPath[to])
    .replace(launcherPathFromWithBackslash, launcherDataPath[to])
    .replace(/\//g, '\\');
}

export function swapWinePaths(from: Platform, to: Platform, path: string) {
  console.log('---');
  console.log(`Before: ${path}`);

  let result = '';
  if (isInnerWinePath(path)) {
    result = swapInnerPaths(from, to, path);
  } else {
    result = swapOuterPaths(from, to, path);
  }

  console.log(`After:  ${result}`);
  return result;
}
