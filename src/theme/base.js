import defaultColors from './defaultColors';
import colorfn from 'color';

const increaseIntensivity = (color, factor) => {
  const clr = colorfn(color);
  const intensified = clr.isDark() ? clr.darken(factor) : clr.lighten(factor);
  return intensified.hex();
};

const decreaseIntensivity = (color, factor) => {
  const clr = colorfn(color);
  const luminStd = 1 / clr.luminosity();
  const fc = luminStd > 6 ? factor * 6 : factor * luminStd;
  const intensified = clr.isDark() ? clr.lighten(fc) : clr.darken(fc);
  return intensified.hex();
};

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

const breakpoints = {
  small: '768px',
  large: '1024px',
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
  titleFont: increaseIntensivity(colors.font, 0.15),
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
    group: decreaseIntensivity(colors.font, 0.25),
    base: colors.font,
    nested: decreaseIntensivity(colors.font, 0.25),
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
});

const search = (colors) => ({
  background: colors.background,
  mark: {
    font: colors.font,
    background: colors.primary
  },
  font: {
    base: colors.font,
    hover: colors.font,
    highlight: colors.fontDark
  },
  hover: colors.border,
  border: colors.border
});

const darkModeSwitch = (colors) => ({
  background: colors.background,
  shadow: colors.shadow,
  fill: decreaseIntensivity(colors.background, 0.4),
  stroke: decreaseIntensivity(colors.background, 0.4),
  hover: colors.primary,
});

const editOnRepo = (colors) => ({
  background: colors.background,
  border: colors.border,
  hover: colors.hover,
  font: {
    base: colors.font,
    hover: colorfn(colors.hover).rotate(90).grayscale().hex(),
  },
});

const jargon = (colors) => ({
  background: colors.background,
  border: colors.border,
  font: colors.font,
  shadow: colors.shadow,
});

const highlights = (colors) => ({
  note: {
    border: colors.orange,
    background: colors.orangeLight,
    font: colors.fontDark,
  },
  warning: {
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
    font: increaseIntensivity(colorfn(colors.primary).negate().grayscale(), 0.5),
  },
  oddRow: colors.mainBackground,
  evenRow: colors.background,
  border: colors.border,
});

const tableOfContents = (colors) => ({
  background: colors.mainBackground,
  font: {
    base: decreaseIntensivity(colors.font, 0.15),
    hover: colors.primary,
    current: colors.primary,
  },
  border: colors.border,
});

const previousNext = (colors) => ({
  background: colors.mainBackground,
  hover: colors.primary,
  font: colors.font,
  fontLabel: decreaseIntensivity(colors.font, 0.45),
  border: colors.border,
  shadow: colors.shadow,
});

const scrollTop = (colors) => ({
  background: colors.primary,
  hover: increaseIntensivity(colors.primary, 0.15),
  arrow: colorfn(colors.primary).negate().grayscale().lighten(0.4).rgb().string(),
});

export default {
  colors: colors,
  breakpoints: breakpoints,
  layout: pageLayout,
  transitions: transitions,
  header: header,
  search: search,
  darkModeSwitch: darkModeSwitch,
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
