import base from './base';
import lightTheme from './light';
import darkTheme from './dark';
import _ from 'lodash';

class ThemeBuilder {
  constructor(base) {
    this.result = _.cloneDeep(base);
  }

  applyColors(colors) {
    this.result['colors'] = _.merge(this.result.colors, colors);
    return this;
  }

  initialize() {
    for (let [key, value] of Object.entries(this.result)) {
      if (typeof value === 'function') {
        this.result[key] = value(this.result.colors);
      } else {
        this.result[key] = value;
      }
    }
    return this;
  }

  applyTheme(theme) {
    this.result = _.merge(this.result, theme);
    return this;
  }

  get() {
    return this.result;
  }
}

export const dark = new ThemeBuilder(base)
  .applyColors(darkTheme.colors)
  .initialize()
  .applyTheme(darkTheme)
  .get();

export const light = new ThemeBuilder(base)
  .applyColors(lightTheme.colors)
  .initialize()
  .applyTheme(lightTheme)
  .get();
