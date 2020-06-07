import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { light, dark } from '../../theme';

class ThemeProvider extends React.Component {
  state = {
    isDarkThemeActive: false,
  };

  constructor({ darkModeConfig }) {
    super();
    this.darkModeConfig = darkModeConfig;
  }

  componentDidMount() {
    this.retrieveActiveTheme();
  }

  retrieveActiveTheme = () => {
    if (!this.darkModeConfig.enabled) {
      return false;
    }
    let isDarkThemeActive = JSON.parse(window.localStorage.getItem('isDarkThemeActive'));
    if (isDarkThemeActive == null) {
      isDarkThemeActive =
        window.matchMedia('(prefers-color-scheme: dark)').matches || this.darkModeConfig.default;
    }
    this.setState({ isDarkThemeActive });
    return isDarkThemeActive;
  };

  toggleActiveTheme = () => {
    if (!this.darkModeConfig.enabled) {
      console.warn('Dark mode is disabled, but trying to activate it.');
      return false;
    }
    this.setState((prevState) => ({ isDarkThemeActive: !prevState.isDarkThemeActive }));

    window.localStorage.setItem('isDarkThemeActive', JSON.stringify(!this.state.isDarkThemeActive));
    return !this.state.isDarkThemeActive;
  };

  render() {
    const { children } = this.props;
    const { isDarkThemeActive } = this.state;
    const currentActiveTheme = isDarkThemeActive ? dark : light;

    return (
      <div>
        <EmotionThemeProvider theme={currentActiveTheme}>{children}</EmotionThemeProvider>
      </div>
    );
  }
}

export default ThemeProvider;
