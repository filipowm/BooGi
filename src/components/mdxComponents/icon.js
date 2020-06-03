import React from 'react';
import * as Icons from 'react-feather';
import { useTheme } from 'emotion-theming';

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const Icon = ({ ...props }) => {
  const theme = useTheme();
  let name = props.name
    .split('-')
    .map(capitalize)
    .reduce((acc, value) => (acc += value), '');
  const icon = Icons[name];
  if (!icon) {
    return '';
  }

  const config = {
    size: props.size || 22,
    color: props.color || theme.colors.color,
  };
  const margin = props.margin || '5px';
  return (
    <span
      css={{
        margin: '0 ' + margin,
        svg: {
          verticalAlign: 'middle',
        },
      }}
    >
      {icon.render(config)}
    </span>
  );
};

export default Icon;
