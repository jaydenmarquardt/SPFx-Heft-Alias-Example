# SPFx Heft Aliases (SPFx 1.22.2)

This package shows how to use TypeScript path aliases in SharePoint Framework (SPFx) 1.22.2 with Heft.

## What this sample demonstrates

- TypeScript alias mapping via `compilerOptions.paths`
- Webpack alias mapping via SPFx webpack patch
- Consuming a component from a web part using alias imports
- Showing the equivalent relative import path in code comments

## Step-by-step setup

### 1) Install dependencies

From the project root:

```bash
npm install
```

See scripts in [package.json](package.json).

### 2) Add and edit these files

Use this checklist in order.

| Action   | File                                                               | Why                                                    |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| Edit     | [tsconfig.json](tsconfig.json)                                     | Enables TypeScript alias resolution in editor/compiler |
| Add/Edit | [config/webpack-patch.json](config/webpack-patch.json)             | Registers webpack patch file                           |
| Add/Edit | [config/webpack-patch/aliases.js](config/webpack-patch/aliases.js) | Enables webpack bundle-time alias resolution           |

### 3) Edit `tsconfig.json`

Add/update `baseUrl` and `paths`:

```jsonc
{
  "extends": "./node_modules/@microsoft/spfx-web-build-rig/profiles/default/tsconfig-base.json",
  "compilerOptions": {
    "target": "es2017",
    "module": "esnext",
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@webparts/*": ["webparts/*"],
    },
  },
}
```

### 4) Add/Edit `config/webpack-patch.json`

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/spfx-build/webpack-patch.schema.json",
  "patchFiles": ["./config/webpack-patch/aliases.js"]
}
```

### 5) Add/Edit `config/webpack-patch/aliases.js`

```js
/* eslint-disable */
const path = require("path");

module.exports = function patchWebpackConfig(webpackConfig) {
  const root = process.cwd();

  const aliases = {
    "@components": path.resolve(root, "lib/components"),
    "@webparts": path.resolve(root, "lib/webparts"),
  };

  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.alias = {
    ...(webpackConfig.resolve.alias || {}),
    ...aliases,
  };

  return webpackConfig;
};
```

### 6) Run the project

```bash
npm run start
```

### 7) Build package for production

```bash
npm run build
```

## Example files

- [tsconfig.json](tsconfig.json)
- [config/webpack-patch.json](config/webpack-patch.json)
- [config/webpack-patch/aliases.js](config/webpack-patch/aliases.js)
- [src/components/example.tsx](src/components/example.tsx)
- [src/webparts/example/ExampleWebpart.ts](src/webparts/example/ExampleWebpart.ts)
