import defaultColors from './defaultColors';
import colorfn from 'color';

const increaseIntensivity = (color, factor) => {
  const clr = colorfn(color);
  const intensified = clr.isDark() ? clr.darken(factor) : clr.lighten(factor);
  return intensified.hex();
};

const decreaseIntensivity = (color, factor) => {
  const clr = colorfn(color);
  const intensified = clr.isDark() ? clr.lighten(factor) : clr.darken(factor);
  return intensified.hex();
};

const colors = {
  ...defaultColors,

  primary: defaultColors.blue,
  primaryDark: defaultColors.blueDark,
  font: '#333334',
  fontDark: '#121213',
  background: '#F5F7F9',
  mainBackground: '#fefefe',
  border: '#DBDDDF',
  hover: defaultColors.blue,
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

const header = {
  background: colors.background,
  shadow: colors.shadow,
  font: {
    base: colors.primary,
    hover: colorfn(colors.primary).negate().hex(),
  },
  border: colors.border,
};

const navigationSidebar = {
  backgroundSecondary: colors.background,
  backgroundPrimary: colors.background,
  border: colors.border,
  row: {
    hover: colors.border,
    active: colors.white,
    activeBorder: colors.border,
    collapseHover: colors.hover,
  },
  font: {
    group: decreaseIntensivity(colors.font, 2),
    base: colors.font,
    nested: decreaseIntensivity(colors.font, 2),
    active: colors.primary,
    hover: colors.primary,
  },
  poweredBy: {
    font: colors.grayLight,
    background: colors.border,
    hover: colors.primary,
  },
};

const content = {
  background: colors.mainBackground,
  border: colors.border,
  font: colors.font,
  titleFont: increaseIntensivity(colors.font, 0.15),
  code: {
    border: colors.border,
    font: colors.fontDark,
    background: colors.background,
  },
};

const editOnRepo = {
  background: colors.background,
  border: colors.border,
  hover: colors.hover,
  font: {
    base: colors.font,
    hover: colorfn(colors.hover).rotate(90).grayscale().hex(),
  },
};

const jargon = {
  background: colors.background,
  border: colors.border,
  font: colors.font,
  shadow: colors.shadow,
};

const highlights = {
  note: {
    border: colors.orange,
    background: colors.orangeLight,
    font: colors.font,
  },
  warning: {
    border: colors.red,
    background: colors.redLight,
    font: colors.font,
  },
  info: {
    border: colors.blue,
    background: colors.blueLight,
    font: colors.font,
  },
  tip: {
    border: colors.green,
    background: colors.greenLight,
    font: colors.font,
  },
};

const table = {
  header: {
    background: colors.primary,
    font: increaseIntensivity(colorfn(colors.primary).negate().grayscale(), 0.5),
  },
  oddRow: colors.mainBackground,
  evenRow: colors.background,
  border: colors.border,
};

const tableOfContents = {
  background: colors.mainBackground,
  font: {
    base: decreaseIntensivity(colors.font, 1.5),
    hover: colors.primary,
    current: colors.primary,
  },
  border: colors.border,
};

const previousNext = {
  background: colors.mainBackground,
  hover: colors.primary,
  font: colors.font,
  fontLabel: decreaseIntensivity(colors.font, 0.45),
  border: colors.border,
  shadow: colors.shadow,
};

const scrollTop = {
  background: colors.primary,
  hover: colorfn(colors.primary).darken(0.3).rgb().string(),
  arrow: colorfn(colors.primary).negate().grayscale().lighten(0.4).rgb().string(),
};

export default {
  colors: colors,
  breakpoints: breakpoints,
  layout: pageLayout,
  transitions: transitions,
  header: header,
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
