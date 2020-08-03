---
title: 'Page config'
order: 1
---

## Frontmatter

Frontmatter can be used to define page-specific metadata and configuration.
The front matter must be the first thing in the file and must take the form
of valid YAML set between triple-dashed lines. Here is a basic example:

```yaml
---
title: Coding like a Pro!
---
```

Between these triple-dashed lines, you can set predefined variables
(see below for a reference) which allow you to customize the page.

```yaml
title: String # title of the page, visible in navigation sidebar, page content title, browser tab title and used for SEO and search
metaTitle: String # used for SEO if provided, otherwise title is used
description: String # page description used for search and SEO
order: Int # page order in navigation sidebar, the lower the higher it will appear
draft: Boolean # set to true to mark page as draft and not publish it (unless overriden by features.publishDraft property)
editable: Boolean # set to true to show Edit on Repo button, set to false to hide it
showMetadata: Boolean # set to true to show page metadata, set to false to hide it
showToc: Boolean # set to true to show Table of Contents, set to false to hide it
tocDepth: Int # Table of Contents depth (depth of headers used to calculate ToC)
showPreviousNext: Boolean # set to true to show previous/next buttons, set to false to hide it
```

**Examples**

<Layout>

```yaml
---
title: 'Navigation'
---
```

```yaml
---
title: 'Navigation'
order: 4
draft: true
editable: true
tocDepth: 1
---
```

</Layout>

## Page link

Page link is defined page file name and directories path relative to `content`
directory. Check [navigation](/content/configuration/navigation) details
to better understand how page link is created.

Further on, when writing content, page link must be used to create valid
links within page content, e.g. `[go to this page](/group/page)`.
