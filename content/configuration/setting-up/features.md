---
title: 'Features'
order: 4
---

//TODO add screenshots

## Publishing draft docs

BooGi allows marking pages as drafts, thus not publishing
them while you are still working on them. However, you can
alter this behavior by setting up `features.publishDraft`
property, or passing `FEATURES_PUBLISH_DRAFT` environment
variable.

```yaml
features:
  publishDraft: true # set to true to publish draft pages
```

## Dark Mode theme

Dark mode theme feature allow **changing between light and dark
styling**. If set switch button appears in header.
To set up dark theme mode, configure following in `config.yml` (under `features` key).

```yaml
features:
  darkMode:
    enabled: true  # set to true to enable dark mode theme feature
    default: false # set to true to set dark mode as a default one
```

Additionally to changes in `config.yml` file, proper theme must be 
configured. To do this, follow description defined in [themes](/configuration/themes)
documentation.

## Edit on Repo

Edit on Repo features shows _Edit on Repo_ button on every page,
where it is configured. It gives all users easy way to start editing
your page.

To set up Edit on Repo, configure following in `config.yml` (under `features` key).

```yaml
features:
  editOnRepo:
    location: https://github.com/filipowm/boogi # URL to Git repository
    type: github # type of Git repository. Only github, gitlab and bitbucket are supported.
    editable: true # whether every page is editable by default. This can be configured per page setting up 'editable' property in frontmatter
```

As written above, even if Edit on Repo is globally turned off or on, it can be altered
per page by setting up `editable` property in [frontmatter](/editingcontent/page_config#frontmatter). This has precedence
over global configuration.

## Mermaid graphs

Mermaid brings generation of diagrams and flowcharts from text in a similar manner as markdown.
Details of usage are described in [Graphs](/editing/rich_content/graphs) section.

To set up Mermaid graphs, configure following in `config.yml` (under `features` key).

```yaml
features:
  mermaid:
    language: "mermaid" # language descriptor used 
    theme: "dark" # diagram color theme. Choose one from: dark, neutral, forest, default.
    options: # additional configuration options
    width: 300 # desired viewport width while rendering the SVG
    height: 300 # desired viewport height while rendering the SVG
```

You can preview available the themes in the [Live Editor](https://mermaidjs.github.io/mermaid-live-editor).
Additional configuration options passed in `features.mermaid.options` can be checked in the
[configuration options](https://mermaid-js.github.io/mermaid/#/mermaidAPI) passed to `mermaid.initialize()`.

## Page progress indicator

Add a page progress indicator to your BooGi website. The progress bar moves as
you scroll down the page. Users can know how far they’ve read into an article or page.

To set up Page Progress, configure following in `config.yml` (under `features` key).

```yaml
features:
  pageProgress:
    enabled: true # set to true to enable
    includePaths: # list of paths for which page progress should be visible
      - "/configuration/advanced/theme" # it can be simple string
      - regex: "^/syntax" # or regex expression
    excludePaths: # list of paths for which page progress should not be visible
      - "/" # it can be simple string
      - regex: "^/anything" # or regex expression
    height: 3 # height in pixels of the progress bar
    prependToBody: false # set to true to prepend progress bar to <body>, otherwise append it
    color: "#A05EB5" # color of the progress bar. As of now light/dark mode themes are not supported
```

## Previous / Next navigation buttons

Previous / Next buttons show up at the bottom of every content page and help
in navigation between previous and next page. While used, you can
also configure left/right arrows to switch between previous/next pages.
It's awesome feature to build tutorials or training pages.

To set up Previous / Next navigation buttons, configure following in `config.yml` (under `features` key).

```yaml
features:
  previousNext:
    enabled: true # set to true to enable buttons globally
    arrowKeyNavigation: true # set to true to switch between pages using left/right arrow keys
```

## Propagating Netlify environment variables

When you deploy BooGi-based page on Netlify, you can take benefit
of automated propagation of some Netlify environment configuration,
such as page URL (especially useful for branch or pull request deployments)
and page location in code repository (e.g. Github).

**We recommend setting this as `true` **.

To set up Netlify configuration propagation, configure following in `config.yml` (under `features` key).

```yaml
features:
  propagateNetlifyEnv: true
```

## RSS feed

BooGi offers creation of _RSS_ feeds. It allows users and applications 
to access updates to websites in a standardized, computer-readable format.

To set up RSS feed, configure following in `config.yml` (under `features` key).

```yaml
features:
  rss:
    enabled: true # set to true to enable RSS feed
    copyright: "2020, Mateusz Filipowicz" # copyright notice for content in the channel
    webMaster: "Mateusz Filipowicz" # email address for person responsible for technical issues relating to channel
    managingEditor: "Mateusz Filipowicz" # email address for person responsible for editorial content
    categories: # list of feed categories
      - Category 1
      - Category 2
    ttl: 60 # number of minutes that indicates how long a channel can be cached before refreshing from the source
    matchRegex: "^/" # regex specifying for which paths (pages) RSS should be created. Defaults to whole page.
    outputPath: "/rss.xml" # path under which feed will be accessible
    generator: "boogi" # indication of the program used to generate the channel
```

## Scroll to Top button

When enabled, this features displays button in bottom right corner
allowing to scroll to top of the page with a single click (or tap).

```yaml
features:
  scrollTop: true # set to true to display scroll to top button
```

## Search

BooGi offers great content search capabilities. For details visit [search](/configuration/settingup/search)

## Page metadata

BooGi can display page metadata (latest editor, last edit date) on every page below
the page title. To set it up globally configure following in `config.yml`:

```yaml
features:
  showMetadata: true
```

Even if page metadata is globally turned off or on, it can be altered
per page by setting up `showMetadata` property in [frontmatter](/editingcontent/page_config#frontmatter). 
This has precedence  over global configuration.

## Table of Contents

Table of Contents displays right sidebar with a useful
navigation between every section of the page. It also follows page scroll
and marks current section visible on the screen. New sections
are divided by using header (`#`) in page content.

To set up table of contents, configure following in `config.yml` (under `features` key).

```yaml
features:
  toc:
    show: true # set to true to show ToC on every page
    depth: 3 # depth of the ToC.
```

Even if table of contents is globally turned off or on, it can be altered
per page by setting up `showToc` property in [frontmatter](/editingcontent/page_config#frontmatter). 
Also on page you can alter depth of table of contents by setting up
`tocDepth` in frontmatter. Both settings have precedence over global configuration.

## Full screen mode

Full screen mode can be used to hide any disruptive page elements
and focus only on content. You can configure which elements should
be hidden while in full screen mode.

**Important:** Full screen mode is disabled by default.

```yaml
features:
  fullScreenMode:
    enabled: false # set to true to enable full screen mode
    hideHeader: true # set to true to hide header while in full screen mode
    hideSidebar: true # set to true to hide sidebar while in full screen mode
    hideToc: true # set to true to hide Table of Contents while in full screen mode
```