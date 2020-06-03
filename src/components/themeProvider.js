import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { default as defaultTheme } from '../theme/main';
import 'css';

export default function ThemeProvider({ children, theme = {} }) {
  return (
    <div>
      <EmotionThemeProvider theme={{ ...defaultTheme, ...theme }}>{children}</EmotionThemeProvider>
    </div>
  );
}
