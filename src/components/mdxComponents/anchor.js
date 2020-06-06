import * as React from 'react';
import { anchor } from '../../styles/base';
import { useTheme } from 'emotion-theming';

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <a href={props.href} css={anchor(useTheme())} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    );
  } else {
    return null;
  }
};

export default AnchorTag;
