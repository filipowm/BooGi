---
title: 'Header'
order: 2
---

Metadata base configuration can be set in `config.yaml` under `header` key.

| Property                  | Description                                                      | Default value |
|---------------------------|------------------------------------------------------------------|---------------|
| `header.enabled`          | Set to `true` to enable (show) header.                           | `true`        |
| `header.logo`             | URL (relative or absolute) to logo. Example: `/assets/logo.png`  |               |
| `header.logoLink`         | URL to page showed when clicked on logo.                         | `/`           |
| `header.helpUrl`          | URL to help page. When set, help icon will be visible in header. |               |
| `header.links`            | List of links visible in header.                                 |               |
| `header.links[].text`     | Text of a header link.                                           |               |
| `header.links[].link`     | URL associated with header link.                                 |               |
| `header.links[].external` | Set to `true` if link should be open in a separate browser tab.  |               |

Other configuration, that has impact on header look are:
* [search](/configuration/settingup/search)
* [dark / light mode](/configuration/settingup/features#darkmode)

**Full example:**

```yaml
header:
  enabled: true
  logo: "/assets/mylogo.png"
  logoLink: "/"
  helpUrl: "https://somehelp.mycompany.com"
  links:
    - text: BooGi
      link: https://github.com/filipowm/boogi
      external: true
    - text: Another Link
      link: /somethinghere
```