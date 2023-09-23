import { fmt } from '../deps.ts';

const { green, bold } = fmt;

export class PathNotDirError extends Error {}

export async function ensureDir(path: string) {
  try {
    await Deno.mkdir(path, { recursive: true });
    console.info(`Created directory ${green(path)}...`);
    return;
  } catch (error) {
    if (error.name !== 'AlreadyExists') {
      throw error;
    }

    if ((await Deno.stat(path)).isFile) {
      throw new PathNotDirError(`Path ${path} exists, but is not a directory`);
    }

    console.info(
      `Directory ${green(path)} already exists. ${bold('Continuing...')}`
    );
  }
}
