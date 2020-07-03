---
title: "Setting up"
order: 1
tocDepth: 1
---

Primary configuration is set in `config.yml` within `config` directory
in you main project directory. Configuration details are described
in subsequent articles.

## Adding images

<Warning>

For adding images (or any other assets) to content, please follow [this](/editing/images) guide instead.
Using assets does not bring performance optimization 
</Warning>

You can use your own logo, favicon, page icons (used by _PWA_). Add images
to `static/assets` directory. Any assets (like images) can be then accessed
under `/assets/<name_of_file>` path. 

Let's assume you add `mylogo.png` image to `static/assets`. Then you can
set a path in `config.yml` logo configuration as 

```yaml
header:
  logo: /assets/mylogo.png
```

## Using environment variables 

Some configuration may be either sensitive (like Algolia API keys) or is per-environment.
To set such properties, you can make use of environment variables
to pass configuration to BooGi / Gatsby while building your project.

Each and every configuration property in `config.yml` can also be
passed in environment variable.

**Important:** List variables are not supported!

**General rule:**

in `config.yml`:
```yaml
property1:
  childProperty: MyApp
```

then env variable should be: `PROPERTY1_CHILD_PROPERTY`.

## Examples

**Example 1:**

<Layout>

```yaml
metadata:
  name: MyApp

features:
  search:
    startComponent: 'input'
```

```bash
METADATA_NAME=MyApp Test
FEATURES_SEARCH_START_COMPONENT=icon
```

</Layout>

**Example 2:**

<Layout>

```yaml
features:
  search:
    enabled: false
```

```bash
FEATURES_SEARCH_ENABLED=true
FEATURES_SEARCH_ALGOLIA_APP_ID=XXXYYYZZZ9
FEATURES_SEARCH_ALGOLIA_SEARCH_KEY=aabbccddeeffgghhiijjkk
FEATURES_SEARCH_ALGOLIA_ADMIN_KEY=xxxyyyzzz
FEATURES_SEARCH_INDEX_NAME=myapp-test-idx
```

</Layout>