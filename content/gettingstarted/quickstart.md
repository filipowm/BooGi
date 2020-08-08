---
title: "Quick Start"
order: 3
---

## Prerequisites

1. Install NodeJS (newest 14+ recommended, minimal 12.18).
2. Install Yarn: `npm install -g yarn`
3. Install Boogi CLI: `npm install -g boogi-cli`

These commands may require root rights, depending on your operating
system and configuration.

## Quick start

1. Initialize BooGi project in current directory:
   ```bash
   boogi init
   ```
   Now wizard will guide you through core BooGi
   configuration.

2. Run your app in development mode with live reload
   ```bash
   boogi develop
   ```
   You can access your app on `localhost:8000`. Any changes
   applied will be automatically applied on running
   development server.

3. Build you app package ready for deployment
   ```bash
   boogi build
   ```
   Built package will be available in `public` directory.

## BooGi directory structure

Below is defined BooGi app directory structure.
**Important** This is applicable only for apps initialized and
using BooGi CLI.

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