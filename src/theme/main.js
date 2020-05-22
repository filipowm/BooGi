import defaultColors from './defaultColors'

const colors = {
  ...defaultColors,

  primary: defaultColors.blue,
  primaryLight: "#d2e9ff",
  primaryLightest: "#e9f4ff",
  primaryDark: defaultColors.blueDark,
  color: "#333333",
  background: "#F5F7F9",
  backgroundSecondary: "#fafafa",
  border: "#E6ECF1",
  hover: defaultColors.blue,
  hoverLight: "rgba(205, 223, 245, .6)",
  hoverDark: "rgba(205, 223, 245, .9)",
  shadow: defaultColors.gray + "33"
};

const transitions = {
  hover: "all .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s",
  hoverFast: "all .3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s",
  hoverFast2: "color .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s",
};

const navigationSidebar = {
  backgroundDark: colors.background,
  backgroundLight: colors.background,
  rowHover: colors.border,
  rowActive: colors.white,
  rowActiveBorder: colors.border,
  collapseHover: colors.hover,
  border: colors.border,
  font: {
    header: "#9DAAB6",
    base: "#3B454E",
    nested: "#9DAAB6",
    active: colors.primary,
    hover: colors.primary
  },
  poweredBy: {
    font: colors.grayLight,
    background: colors.border,
    hover: colors.primary
  }
};

const header = {
  background: colors.white,
  font: {
    base: colors.primary,
    hover: colors.orange,
    title: colors.white
  },
  border: colors.border
};

const tableOfContents = {
  font: {
    base: colors.gray,
    hover: colors.blue,
    current: colors.blue
  },
  border: colors.border
};

const breakpoints = {
  'small': '768px',
  'large': '1024px'
};

const pageLayout = {
  leftWidth: '318px',
  leftMargin: '30px',
  rightWidth: '',
  rightMargin: ''
};

const shadows = {

}

export default {
  colors: colors,
  navigationSidebar: navigationSidebar,
  tableOfContents: tableOfContents,
  header: header,
  breakpoints: breakpoints,
  transitions: transitions,
  layout: pageLayout
};
