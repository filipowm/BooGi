import defaultColors from './colors';

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

export default {
  colors: colors,
};
