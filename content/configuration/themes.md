---
title: "Themes / styling"
order: 3
---

Themes is a way to customize BooGi app to meet your branding 
and desired look-and-feel. You can change color of nearly **every**
component on the page.

BooGi offers two themes: light and dark. By both themes are used.
To disable dark mode, set `features.darkMode.enabled=false`
in `config.yml`.

Theme configuration is stored in `light.js` and `dark.js` files
for light and dark theme respectively. Additionally, BooGi
offers a way to change basic colors used on the site. Default colors
definition is stored in `colors.js` file. All these files are in
`config/theme` directory of your BooGi app.

## Understanding theme setup

When using BooGi CLI, by default [minimal](#minimal) minimal configuration
will be present in configuration files.

You can use any CSS-compatible color format: HEX, RGB, RGBA, HSL, HSLA.

Base colors (red, green, blue etc..) are defined in `colors.js` library.
You can quickly change basic colors used.



Theme is split into certain page objects like header, sidebar, search,
content etc. Each consists of dedicated set of theme properties.
For full list of properties check [full](#full) configuration
reference.

If you don't want go deep into each object configuration, you can
apply minimal configuratin to customize BooGi app to your needs.
Check [minimal configuration reference](#minimal) for an example.

You can change any single parameter -- there is no need to change whole 
configuration of any object. The defaults will be applied to the rest.
For instance, if you want to override header background color,
you can just define:

```javascript
const header = (colors) => ({
  background: '#3a4b5c'
});
```

Each object defined in the theme should receive `colors` parameter, which is 
an object of base colors, defined in the same file as `colors`. 

<Info>Remember to define each object as a function with colors parameter!</Info>

### Using color library

BooGi uses `color` - a JavaScript library for immutable color conversion 
and manipulation with support for CSS color strings. It uses it to automatically
calculate values of some properties based on the default colors used. Thanks to it
you don't need to care about each single color on the page -- BooGi will do it for you.
Check [this site](https://github.com/Qix-/color) for details about `color` library.

You can use `color` library in your theme definition. For example:

```javascript
import colorfn from 'color';

const search = (colors) => ({
  background: colorfn(colors.background).darken(1.3).rgb().string(),
  pagination: {
    current: {
      font: colorfn(colors.primary).negate().grayscale().hex(),
    },
  },
});
```

## Minimal

Minimal configuration can be used to quickly customize theme to your needs.
You can change here basic colors, which are then referenced (used) in other
page objects.

`colors` object is the most important one when it comes to defining the theme --
all other objects use its fields to properly set up colors (you can alter
this behavior, see [full configuration](#full)).

```javascript
import defaultColors from './colors';

const colors = {
  ...defaultColors,

  primary: defaultColors.red,
  primaryDark: defaultColors.blueDark,
  font: '#dddddd',
  fontDark: '#8a8a8a',
  background: '#29282A',
  mainBackground: '#1E1E1F',
  border: '#323234',
  hover: defaultColors.red,
  shadow: defaultColors.gray + '33',
};

export default {
  colors: colors,
};
```

## Full

Reference below presents full theme configuration for all fields.
It contains also example of using `color` library.
If you're interested in actual BooGi base configuration, check
https://github.com/filipowm/BooGi/blob/develop/src/theme/base.js .
It contains full definition of the default light theme.

```javascript
import defaultColors from './colors';
import colorfn from 'color';

const colors = {
  ...defaultColors,

  primary: defaultColors.red,
  primaryDark: defaultColors.blueDark,
  fontLight: '#efefef',
  font: '#dddddd',
  fontDark: '#8a8a8a',
  background: '#29282A',
  mainBackground: '#1E1E1F',
  border: '#323234',
  hover: defaultColors.red,
  shadow: defaultColors.gray + '33',
};

const pageLayout = {
  leftWidth: '318px',
  leftMargin: '30px',
  rightWidth: '',
  rightMargin: '',
};

const transitions = {
  hover: 'all .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
  hoverFast: 'all .3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
  hoverColor: 'color .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
};

const content = (colors) => ({
  background: colors.mainBackground,
  border: colors.border,
  font: colors.font,
  titleFont: colors.font,
  code: {
    border: colors.border,
    font: colors.fontDark,
    background: colors.background,
  },
});

const navigationSidebar = (colors) => ({
  backgroundSecondary: colors.background,
  backgroundPrimary: colors.background,
  border: colors.border,
  row: {
    hover: colors.border,
    active: colorfn(colors.white).mix(colorfn(colors.background)).whiten(3.5).hex(),
    activeBorder: colors.border,
    collapseHover: colors.hover,
  },
  font: {
    group: colorfn(colors.font).darken(0.2).hex(),
    base: colors.font,
    nested: colorfn(colors.font).lightn(1.2).hex(),
    active: colors.primary,
    hover: colors.primary,
  },
  poweredBy: {
    font: colors.grayLight,
    background: colors.border,
    hover: colors.primary,
  },
});

const header = (colors) => ({
  background: colors.background,
  shadow: colors.shadow,
  font: {
    base: colors.primary,
    hover: colorfn(colors.primary).negate().hex(),
  },
  border: colors.border,
  icons: {
    background: colors.background,
    shadow: colors.shadow,
    fill: colors.primary,
    stroke: colors.primary,
    hover: colors.primary,
  },
});

const search = (colors) => ({
  background: colors.background,
  mark: {
    font: colors.font,
    background: colors.primary,
  },
  font: {
    base: colors.font,
    hover: colors.font,
    highlight: colors.fontDark,
  },
  hover: colors.border,
  border: colors.border,
  pagination: {
    background: colors.mainBackground,
    border: colors.border,
    font: colors.font,
    hover: colors.border,
    current: {
      background: colors.primary,
      font: colorfn(colors.primary).negate().grayscale().hex(),
    },
  },
});

const editOnRepo = (colors) => ({
  background: colors.background,
  border: colors.border,
  hover: colors.hover,
  font: {
    base: colors.font,
    hover: colorfn(colors.primary).negate().grayscale().hex(),
  },
});

const jargon = (colors) => ({
  background: colors.background,
  border: colors.border,
  font: colors.font,
  shadow: colors.shadow,
});

const highlights = (colors) => ({
  warning: {
    border: colors.orange,
    background: colors.orangeLight,
    font: colors.fontDark,
  },
  error: {
    border: colors.red,
    background: colors.redLight,
    font: colors.fontDark,
  },
  info: {
    border: colors.blue,
    background: colors.blueLight,
    font: colors.fontDark,
  },
  tip: {
    border: colors.green,
    background: colors.greenLight,
    font: colors.fontDark,
  },
});

const table = (colors) => ({
  header: {
    background: colors.primary,
    font: colorfn(colors.primary).negate().grayscale().lighten(0.2).hex(),
  },
  oddRow: colors.mainBackground,
  evenRow: colors.background,
  rowHover: colors.hover + '3d',
  border: colors.border,
});

const tableOfContents = (colors) => ({
  background: colors.mainBackground,
  font: {
    base: colors.font,
    hover: colors.primary,
    current: colors.primary,
  },
  border: colors.border,
});

const previousNext = (colors) => ({
  background: colors.mainBackground,
  hover: colors.primary,
  font: colors.font,
  fontLabel: colors.font,
  border: colors.border,
  shadow: colors.shadow,
});

const scrollTop = (colors) => ({
  background: colors.primary,
  hover: colorfn(colors.primary).darken(0.4).hex(),
  arrow: colorfn(colors.primary).negate().grayscale().lighten(0.4).rgb().string(),
});

export default {
  colors: colors,
  layout: pageLayout,
  transitions: transitions,
  header: header,
  search: search,
  navigationSidebar: navigationSidebar,
  content: content,
  editOnRepo: editOnRepo,
  jargon: jargon,
  highlights: highlights,
  table: table,
  tableOfContents: tableOfContents,
  previousNext: previousNext,
  scrollTop: scrollTop,
};
```