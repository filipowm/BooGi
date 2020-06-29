---
title: 'Progressive Web App'
order: 1
showToc: true
---

<Tip>

We recommend setting up PWA, which **greatly improves
user experience** of your BooGi page.
</Tip>

A Progressive Web App (PWA) is a web app that uses modern web capabilities 
to deliver an app-like experience to users. These apps meet certain requirements
(see below), are deployed to servers, accessible through URLs, and indexed 
by search engines (optionally).

To be considered a Progressive Web App, BooGi-based pages:

* **Progressive** - Work for every user, regardless of browser choice.

* **Responsive** - Fit any form factor, desktop, mobile, tablet, or whatever is next.
  (improvements in responsiveness are coming soon..)

* **Connectivity independent** - Enhanced with service workers to work offline or on
  low quality networks.

* **App-like** - Use the app-shell model to provide app-style navigation and
  interactions.

* **Fresh** - Always up-to-date thanks to the service worker update process.

* **Safe** - Served via HTTPS to prevent snooping and ensure content has not been
  tampered with. (depends on deployment option of your choice)

* **Discoverable** - Are identifiable as “applications” thanks to W3C manifests
  and service worker registration scope allowing search engines to find them.

* **Re-engageable** - Make re-engagement easy through features like push notifications.

* **Installable** - Allow users to “keep” apps they find most useful on their
  home screen without the hassle of an app store.

* **Linkable** - Meaning they’re zero-friction, zero-install, and easy to share.

## Configuration

In order for PWA to work properly, following base properties **must 
be set properly** as defined in [base configuration](/configuration/settingup/base):
`metadata.name`, `metadata.pathPrefix`, `metadata.themeColor`.
Additional properties used, when provided, are: `metadata.short_name` (othwerise
calculated from name), `metadata.description`, `metadata.language` (defaults to `en`).

| Property                     | Description                                                                                                                                                                                                                                                                           | Required | Default value                         |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------|
| `pwa.enabled`                | Set to `true` if you want to enable PWA.                                                                                                                                                                                                                                              | Yes      | `true`                                |
| `pwa.manifest.display`       | Customize what browser UI is shown when your app is launched. For example, you can hide the address bar and browser chrome.<br/><br/>Read more in the [Display](#display) section below.                                                                                                | No       | `minimal-ui`                          |
| `pwa.manifest.crossOrigin`   | Set value to `use-credentials` to enable sharing resources via cookies. Any invalid keyword or empty string will fallback to `anonymous`.<br/><br/>You can find more information about crossorigin on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin).  | No       | `anonymous`                           |
| `pwa.manifest.icon`          | Path to icon the app should use and generate icons of other resolution based on it. It must exist in `assets`. Example: `/assets/mysite.png`. At least one of `pwa.manifest.icon` or `pwa.manifest.icons` must be set.<br/><br/>Read more about icons in [Icons](#icons) section below. | Yes      | Value taken from `metadata.siteImage` |
| `pwa.manifest.icons`         | List of icons the app should use. Example: `/assets/mysite-512.png`. At least one of `pwa.manifest.icon` or `pwa.manifest.icons` must be set. Read more about icons in [Icons](#icons) section below.                                                                                 | Yes      |                                       |
| `pwa.manifest.icons[].src`   | Path to specific icon the app should use.                                                                                                                                                                                                                                             | Yes      |                                       |
| `pwa.manifest.icons[].sizes` | A string containing space-separated image dimensions used as app icons. Examples: `512x512`, `72x72 128x128 256x256`.                                                                                                                                                                 | Yes      |                                       |
| `pwa.manifest.icons[].type`  | [MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the icon used. **It is automatically calculated, so override it with caution**.                                                                                                           | No       | Automatically calculated              |

### Icons

There are three modes in which icon generation can function: _automatic_,
_hybrid_, and _manual_.

* **Automatic** - Generate a pre-configured set of icons from a single source icon.
  Used when only `pwa.manifest.icon` is set.
* **Hybrid** - Generate a manually configured set of icons from a single source icon.
  Used when both `pwa.manifest.icon` and `pwa.manifest.icons` are set.
* **Manual**- Don’t generate or pre-configure any icons. 
  Used when only `pwa.manifest.icons` is set.

If favicon is missing and not defined in `pwa.metadata.favicon`, it also will be created
in automatic or hybrid modes.

<Info>

**IMPORTANT:** For best results, if you’re providing an icon for generation it should be:

* at least as big as the largest icon being generated (512x512 by default).
* square (if it’s not, transparent bars will automatically be added to make it square).
* of one of the following formats: JPEG, PNG, WebP, TIFF, GIF or SVG.
  
</Info>

### Display

Below is a set of allowed properties of `pwa.manifest.display` property.

| Property     | Use                                                                                                                                                                                  |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fullscreen` | Opens the web application without any browser UI and takes up the entirety of the available display area.                                                                            |
| `standalone` | Opens the web app to look and feel like a standalone native app. The app runs in its own window, separate from the browser, and hides standard browser UI elements like the URL bar. |
| `minimal-ui` | This mode is similar to `standalone`, but provides the user a minimal set of UI elements for controlling navigation (such as back and reload).                                       |
| `browser`    | A standard browser experience.                                                                                                                                                       |

## Minimal configuration example

```yaml
metadata:
  name: My Awesome BooGi site
  siteImage: /assets/myapp.png
  pathPrefix: /
  theme_color: '#0066cc'
pwa:
  enabled: true
```

## Full configuration example

```yaml
metadata:
  name: My Awesome BooGi site
  short_name: BooPWA
  description: This is my PWA-enabled BooGi site
  language: en
  pathPrefix: /
  theme_color: '#0066cc'
pwa:
  enabled: true
  manifest:
    display: standalone
    crossOrigin: use-credentials
    icon: "/assets/mycustomicon.png"
    icons:
      - src: /assets/pwa-320.png
        sizes: 320x320
```

