import { os as _os } from '../deps.ts';

const os = _os.default;

export const HOME = os.homeDir();
const USER = Deno.env.get('USER');

export const launcherDataPath = {
  linux: '.xlcore',
  darwin: 'Library/Application Support/XIV on Mac',
};

export const innerUserPath = {
  linux: `C:\\users\\${USER}`,
  darwin: 'C:\\users\\emet-selch'
};

export const outerUserPath = {
  linux: `Z:\\home\\${USER}`,
  darwin: `Z:\\Users\\${USER}`,
};

export function toWinePathZ(path: string): string {
  return `Z:${HOME}/${path}/`.replace(/\//g, '\\');
}
