import { os as _os } from '../deps.ts';

const os = _os.default;

export function platform() {
  if (os.platform() === 'windows') {
    console.log('Windows not yet supported');
    Deno.exit(65);
  }

  return os.platform() as 'linux' | 'darwin';
}
