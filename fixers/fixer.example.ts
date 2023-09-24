// This is a very basic fixer example with the minimum required.
// It will not run by default, nor any other files in this directory
// that end in `example.ts`

import { importJsonConfig, swapWinePaths } from "../utils/config-utils.ts";

import type { Platform } from '../types.d.ts';

// Config file, relative to your <XIV Launcher dir>/pluginConfigs
// May contain path separators, and they will be reflected in the
// resulting file structure
export const filename = 'MyConfig.json';

// This function must take these two arguments
export async function run(from: Platform, to: Platform) {
  // Read the config file into a POJO
  const config = await importJsonConfig(filename);

  // Manipulations here. Do whatever you need.
  config.SomePath = swapWinePaths(from, to, config.SomePath);

  // Return your fixed config, either as a string or as a serializable object
  // to be fed into `JSON.stringify()`
  return config;
}
