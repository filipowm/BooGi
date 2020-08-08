---
title: 'Sidebar'
order: 3
---

Metadata base configuration can be set in `config.yaml` under `sidebar` key.

| Property                      | Description                                                                                                                                                                          | Default value |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `sidebar.enabled`             | Set to `true` to enable sidebar.                                                                                                                                                     | `true`        |
| `sidebar.ignoreIndex`         | Set to `true` to not show main page (index) as first entry in the sidebar.                                                                                                           | `false`       |
| `sidebar.forcedNavOrder`      | List of paths, for which order in sidebar will be enforced. It has priority over any other order setting. Read more about [navigation](/configuration/navigation).                   |               |
| `sidebar.expanded`            | List of paths which sidebar entries will be expanded by default, if they are nested.                                                                                                 |               |
| `sidebar.groups`              | List of sidebar groups.                                                                                                                                                              |               |
| `sidebar.groups[].path`       | Path associated with the group. Read more about [navigation](/configuration/navigation) to understand how to set this up.                                                            |               |
| `sidebar.groups[].title`      | Group title, it can include [emojis](/richcontent/emojis).                                                                                                                           |               |
| `sidebar.groups[].order`      | Order number of groups. The lower number, the higher order and group will appear higher in sidebar. If not provided or there are groups with equal order, groups are sorted by name. |               |
| `sidebar.groups[].icon`       | URL to icon associated with the group. You can mix using emojis in group title and group icons.                                                                                      |               |
| `sidebar.links`               | List of external links visible in at the bottom of sidebar.                                                                                                                          |               |
| `sidebar.links[].text`        | Text of the external link.                                                                                                                                                           |               |
| `sidebar.links[].link`        | External link URL.                                                                                                                                                                   |               |
| `sidebar.poweredBy.trademark` | Logo for the Powered By component.                                                                                                                                                   |               |
| `sidebar.poweredBy.name`      | Name on the Powered By component. If name is not provided, Powered By component will be not visible.                                                                                 |               |
| `sidebar.poweredBy.link`      | URL to the page, which will appear when clicked on Powered By component.                                                                                                             |               |

**Full example:**

```yaml
sidebar:
  enabled: true
  forcedNavOrder:
    - "/introduction"
    - "/configuration/basic"
    - "/configuration/advanced"
  expanded:
    - /configuration/advanced
  groups:
    - order: 1
      path: "/gettingstarted"
      title: "Getting Started"
      icon: /assets/starting.png
    - order: 2
      path: "/configuration"
      title: ":wrench: Configuration"
    - order: 2
      path: "/editing"
      title: ":writing_hand: Editing Content"
  ignoreIndex: false
  links:
    - text: BooGi
      link: https://github.com/filipowm/boogi
  poweredBy:
    trademark: "/assets/gatsby.png"
    name: GatsbyJS
    link: https://www.gatsbyjs.org
```