# xiv-plugin-config-adapter

**WARNING**: Very early state. Works for my specific use case, and I know what I'm doing with it. But for you, it will burn your house down, and then blow it up for good measure. No reasonable checks are in place for anything really. No warranties for anything at all.

This is a quick, dirty, ugly, horrendous utility I wrote to help me convert my Dalamud plugin configs as I constantly swap between Linux and MacOS. It's mostly based on _[fixers](./fixers)_ which are functions that read a config file into a javascript object, modify it in some way, and return the modified configuration for writing to disk.

See [`fixers/fixer.example.ts`](./fixers/fixer.example.ts) for a start.

## Requirements

[Deno](https://deno.land). Not sure which version; latest one as of writing this is `1.37.0`, so probably go with that.

Windows not supported. Don't have a Windows system to try this on. If you want to remove the [platform check](./utils/platform-check.ts) and give it a try, go ahead. [The path definitions](./utils/path-defs.ts) will also need updating.

## Usage

Deno's security sandbox requires these `--allow` flags. They can be omitted and Deno will ask for each individual permission.

```sh
deno run --allow-env --allow-read --allow-write ./cli.ts --from=<platform>
```

Alternatively, use [`deno compile`](https://docs.deno.com/runtime/manual/tools/compiler) to generate a static executable:

```sh
deno compile --allow-env --allow-read --allow-write --output adapter ./cli.ts

# ...

./adapter --from=<platform>
```

### Arguments

Flag | Accepted values | Default | Description
--- | --- | --- | ---
`--from` | `linux` or `darwin` | **mandatory** | Where were your config files generated in
`--to` | `linux` or `darwin` | Your current platform | Target platform
`--dir` | Some path | `./out` in the current working directory | Config files will be written here, overwriting if necessary

## License

[MIT](./LICENSE)
