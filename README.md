# snowpack-plugin-rescript

Snowpack plugin for running building whole project through `bsb-platform`

## Installation

```bash
npm install snowpack-plugin-rescript -D
```

After this you should add plugin to `snowpack.config.js`:

```json
{
  "plugins": ["snowpack-plugin-rescript"]
}
```

Also you must have `bsconfig.json` file with `in-source` option.

Why? [Because ReScript team recommend it](https://rescript-lang.org/docs/manual/latest/interop-with-js-build-systems)

```json
{
  "package-specs": {
    "module": "es6-global",
    "in-source": true
  },
  "suffix": ".bs.js"
}
```

## License

MIT License
