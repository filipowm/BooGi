---
title: 'Base configuration'
order: 0
---

While creating your own BooGi-based page, you should first set up
metadata. It defines core information about your page required for
it to work, its identification and SEO.

Metadata base configuration can be set in `config.yaml` under `metadata` key.

| Property                | Description                                                                                                                                                                                                                                                 | Required | Default value         |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------|
| `metadata.name`         | Website full name.                                                                                                                                                                                                                                          | Yes      |                       |
| `metadata.short_name`   | Website short name, it can be abbreviation.                                                                                                                                                                                                                 | No       |                       |
| `metadata.description`  | Website description. Used to improve website SEO.                                                                                                                                                                                                           | No       |                       |
| `metadata.url`          | Full URL to this website, e.g. `https://mysite.com`.                                                                                                                                                                                                        | Yes      | http://localhost:8000 |
| `metadata.language`     | Website language. Use [ISO Language Code](https://www.w3schools.com/tags/ref_language_codes.asp) to define language property.                                                                                                                               | No       | en                    |
| `metadata.pathPrefix`   | Prefix defined within your reverse proxy or web server, on which this page is hosted. It can be also referred to as context. Example if your page is accessible under `https://mysite.com/**mycontext**`, then `pathPrefix` should be set to `/mycontext`.  | Yes      | /                     |
| `metadata.favicon`      | Path to favicon. Can be relative (e.g. `/assets/favicon.png`) or absolute (e.g. `https://somesite.com/myfavicon.png`).                                                                                                                                      | No       | /assets/favicon.png   |
| `metadata.siteImage`    | URL to image describing the website. Used to improve website SEO.                                                                                                                                                                                           | No       |                       |
| `metadata.themeColor`   | Primary theme color of the website. More information about it you can check [here](https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color).                                                                           | No       |                       |
| `metadata.gaTrackingId` | Google Analytics Tracking ID. It is used to enable Google Analytics for the website.                                                                                                                                                                        | No       |                       |

**Full configuration example**

```yaml
metadata:
  name: Your Docs Name
  short_name: YDN
  description: This is awesome page based on BooGi
  url: https://myapp.com
  language: en
  pathPrefix: /
  favicon: "/assets/favicon.png"
  siteImage: "/assets/mypageimage.png"
  themeColor: "#AB12C3"
  gaTrackingId: UA-000000-2
```