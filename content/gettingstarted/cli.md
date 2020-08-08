---
title: "BooGi CLI"
order: 4
---

<Tip>

**BooGi CLI is a recommended way of working with BooGi apps**.
However, if you need full control over your app, what comes with
a cost of significantly increased complexity, you can
still use Gatsby CLI.

</Tip>

CLI for BooGi used to speed up and simplify development
of BooGi-based apps.

## :label: Requirements

- NodeJS in version _12.13_ or higher
- Yarn (`npm install -g yarn`)
- BooGi CLI `npm install -g boogi-cli`

## :book: Guide


### App structure

BooGi CLI is creating following directory structure

```bash
+-- .boogi.yml   # BooGi CLI configuration file
+-- package.json # 
+-- README.md    # Your BooGi app readme
│
+-- assets/      # Directory with static assets not used inside content (e.g. logo)
│
+-- config/      # Directory with BooGi app configuration
│   +-- config.yml  # BooGi configuration file
│   +-- jargon.yml  # Jargon (abbrevations / definitions) configuration file
│   +-- theme/      # Directory with BooGi app theme (look-and-feel) configuration
│       +-- colors.js # Base colors configuration file
│       +-- dark.js   # Dark theme configuration file
│       +-- light.js  # Light theme configuration file
│
+-- content/     # Directory with your app content
│   +-- index.md # Root page content file (do not remove!)
│
+-- snippets/ # Directory with external code snippets, which can be embedded in content
```

### boogi init

Initialize BooGi app in a given path. This gives a way to easily and quickly
start a BooGi project.

```
boogi init [path] [-f|--full] [--skip|--skip-config] [-d|--debug]
```

`path` - path where BooGi project will be initialized. Defaults to current directory.

`-f`, `--full` - use full (advanced) configuration wizard. Guides you through most of available configuration options.

`--skip`, `--skip-config` - skip configuration wizard. Default values will be applied.

`-d`, `--debug` - enable debugging mode.

### boogi develop

Start BooGi development server on specified port (default 8000).
The development server supports live (hot) reload on any changes.

```
boogi develop [-p|--port] [-d|--debug]
```
`-p`, `--port` - port on which development server will run. Defaults to `8000`.

`-d`, `--debug` - enable debugging mode.

**Note** Changes done to `config/jargon.yml` will not be reloaded.
To apply changes to jargon you must restart server.

### boogi build

Build BooGi project. Deployment-ready package will be created
in `public` directory.

```
boogi build [-a|--archive] [-d|--debug]
```

`-a`, `--archive` - archive (zip) result directory. `public.zip` file will be created
with your built app.

`-d`, `--debug` - enable debugging mode.

### boogi clean

Wipe the local BooGi environment including built assets and cache.
Useful in case of issues while running `build` or `develop` commands.

```
boogi clean
```

## :construction_worker: Roadmap

- add feature to manage navigation sidebar (create, edit, remove groups etc..)
- add feature to manage pages (create, edit, remove etc..)
- add feature to manage theme