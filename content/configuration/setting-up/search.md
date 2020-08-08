---
title: 'Search'
order: 5
tocDepth: 3
---

BooGi comes with a content search capabilities. It takes care of indexing
content during page build time and makes indexed data accessible
in Search UI.

Two search engines are supported:
* [Algolia](https://algolia.com) - external service providing superb search capabilities
* localsearch - search in your browser, without integrating with any external service

<Tip>

For the best search experience we recommend using Algolia.
</Tip>

# What is indexed?

To provide best search experience, following data is indexed:

* page title
* content excerpt (number of characters is configurable)
* page path (URL)
* page internal ID
* page category (_coming soon_)

# Algolia vs Localsearch

<Layout>

<p>

**Algolia** (recommended)
- uses external Algolia service, so indexed data is stored externally
- outstanding search results quality
- constant, low memory usage
- very fast, minimal network overhead
- need to be enabled explicitly (`features.search.engine=algolia`)
- paid, free tier for small indices and low load

</p>

<p>

**LocalSearch**
- uses only client device (browser) for all computation, all data is local
- low-to-medium search results quality, depending on configuration
- memory usage growing with the number and size of pages, may be significant on big pages
  as index and excerpts are stored on the client
- very fast, no additional network calls involved to query data
- enabled by default
- free

</p>

</Layout>

# LocalSearch

LocalSearch engine is a client-side search powered by [FlexSearch](https://github.com/nextapps-de/flexsearch).
It does not need any external service to work, index is created during build time
and whole searching is done on the client (browser).

To make LocalSearch work there is no additional configuration needed then
setting up BooGi :smiley:

## Tuning engine

https://github.com/nextapps-de/flexsearch#options

FlexSearch engine is customizable and you can configure to satisfy your needs 
(speed, accuracy / relevance, memory consumption). 

Default engine configuration is tuned to provide best search results,
keeping great search speed and reasonable memory consumption.

<Warn>

Don't change Flexsearch engine configuration if you don't know what you
are doing. Default settings provide great results already.
</Warn>

Follow [this guide](https://github.com/nextapps-de/flexsearch#options) to learn
more how you can set up FlexSearch engine to satisfy your needs.

To configure Flexsearch engine pass proper configuration to 
`features.search.localSearchEngine` property in `config.yml`.


# Algolia

Algolia is a _SaaS_ search engine, offering full-text search, capable of delivering
real-time results. Algolia’s powerful API lets you quickly and seamlessly index content
and implement search within your websites.

Algolia offers great free tier, which may be sufficient for plenty of pages using BooGi.
For more details on Algolia follow its [documentation](https://www.algolia.com/doc/).

## Setting up Algolia

The first step is to create and set up Algolia account. In order
to make Algolia working properly with your page, you need following:

1. Algolia application
2. Index
3. Search-only API key for given Index (or whole application), used for searching
3. Admin API key for given Index (or whole application), used only for building and managing
   index. It is used **only during page build time**.

### Creating Algolia application

You can create a new application in the **My Account** section of the dashboard. 
Then, in the **Applications** tab, select **New application**. You can then switch 
between your applications via the top-left dropdown menu.

After creating application, open it to further configure it.
Go to **API Keys** tab in Application' dashboard and note down
**Application ID** which will be required later on when configuring _BooGi_.

### Creating an index

Go to **Indices** tab in Application' dashboard to create a new index.
Click on **New...** then **Index** and provide its name.

### Setting up Search and Admin API key

Go to **API Keys** tab in Application' dashboard to manage API keys.

You can either use Application-scoped API keys
or more fine-grained Index-scoped API keys.

<Tip>Use Index-scoped API keys instead of Application-scoped API keys,
because they provide more security by applying least-privilege approach.</Tip>

#### Application-scoped API keys

Application-scope keys have either search or admin rights to all indices
within application. They may have too broad permissions than required.

They are created by default and accessible in **Your API Keys** tab.

#### Index-scoped API keys 

Index-scope keys allow setting up more fine-grained permissions to API keys. 
You can configure them to set certain access rights to certain indices.

Go to **All API Keys** tab and select **New API Key**. Set up desired
configuration and select proper ACLs:

* for Search API Key: `search` scope,
* for Admin API Key: `addObject`, `deleteObject`, `browse`, `settings`,
  `editSettings` scopes.

**Remember to select proper Indices to which API keys will have rights**.

### Managing environments

There are two main approaches to managing different environments:

* application per environment
* index per environment within single application

Follow [this guide](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-environments/)
to decide which approach will fit you better.

<Tip>If you're on free tier, you would benefit from _application per environment_
approach, because search quota is defined per whole application, thus each
application has separate quota.</Tip>

# Setting up BooGi

<Warning>

**Do not hardcode values** for `algoliaAppId`, `algoliaSearchKey` and `algoliaAdminKey` 
as they may leak to your source control system and anyone could potentially 
gain access to your Algolia account! **Use environment variables** instead.
For more details visit [this page](/configuration/basic).
</Warning>

Search configuration is set in `config.yaml` under `features.search` key.

|  Property                        | Description                                                                                                                                                                                                                                    | Default       |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `search.enabled`                 | Set to `true` to enable search.                                                                                                                                                                                                                | `true`        |
| `search.engine`                  | Search engine to use. Allowed values: `localsearch`, `algolia`                                                                                                                                                                                 | `localsearch` |
| `search.localSearchEngine`       | (Localsearch only) Localsearch engine configuration. For details vising [this page](https://github.com/nextapps-de/flexsearch#options). **Warn** Only for advanced users. You can rely on default configuration, which offers best search results.    |               |                                                                                                                                              | `localsearch` |
| `search.indexName`               | (Algolia only) Name of the search index                                                                                                                                                                                                        | `docs`        |
| `search.algoliaAppId`            | (Algolia only) Algolia Application ID. It can be found in _API Keys_ section in Algolia dashboard.<br/>Example: `AB1CDE2FGH`                                                                                                                   |               |
| `search.algoliaSearchKey`        | (Algolia only) Algolia Search API Key.<br/>More details about Search Key in section above.                                                                                                                                                     |               |
| `search.algoliaAdminKey`         | (Algolia only) Algolia Search API Key.<br/>More details about Admin Key in section above.                                                                                                                                                      |               |
| `search.excerptSize`             | A number of content excerpt characters sent to Algolia for indexing                                                                                                                                                                            | `30000`       |
| `search.placeholder`             | Placeholder text visible on search input.                                                                                                                                                                                                      | `Search...`   |
| `search.startComponent`          | Component used in header to initialize search.<br/><br/>**Allowed values**: `input`, `icon`.<br/>When `input` is used then search input form is shown in header.<br/>When `icon` is used, just a search icon is shown in header (it is compact option). | `icon`     |
| `search.debounceTime`            | Time in milliseconds between last keystroke and invoking search operation. It is used to minimize number of search operations and improve overall site performance.<br/><br/>Reasonable values are between 250ms and 600ms.                    | `380`         |
| `search.snippetLength`           | Number of words shown in a details of a single search result.                                                                                                                                                                                  | 22            |
| `search.hitsPerPage`             | Number of search results per page.                                                                                                                                                                                                             | 10            |
| `search.showStats`               | Set to `true` to show search statistics (results count and search time) in a results sidebar.                                                                                                                                                  | `true`        |
| `search.pagination.enabled`      | Set to `true` to enable search results pagination. If disabled, then only one page will be always visible.                                                                                                                                     | `true`        |
| `search.pagination.totalPages`   | Maximum number of search pages.                                                                                                                                                                                                                | 10            |
| `search.pagination.showNext`     | Set to `true` to show next page button.                                                                                                                                                                                                        | `true`        |
| `search.pagination.showPrevious` | Set to `true` to show previous page button.                                                                                                                                                                                                    | `true`        |

**Full configuration example - Algolia**

```yaml
features:
  search:
    enabled: true,
    indexName: 'myindex'
    engine: 'algolia'
    excerptSize: 10000
    placeholder: 'Search here...'
    startComponent: 'input'
    debounceTime: 380,
    snippetLength: 22,
    hitsPerPage: 10,
    showStats: true,
    pagination:
      enabled: true,
      totalPages: 10,
      showNext: true,
      showPrevious: true
```

**Full configuration example - LocalSearch**

```yaml
features:
  search:
    enabled: true,
    engine: 'localsearch'
    localSearchEngine: 'balance'
    excerptSize: 10000
    placeholder: 'Search here...'
    startComponent: 'input'
    debounceTime: 380,
    snippetLength: 22,
    hitsPerPage: 10,
    showStats: true,
    pagination:
      enabled: true,
      totalPages: 10,
      showNext: true,
      showPrevious: true
```
