import * as React from 'react';
import { anchor } from '../../styles';
import { useTheme } from 'emotion-theming';
import { Link } from '../';

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <Link to={props.href} css={anchor(useTheme())}>
        {link}
      </Link>
    );
  } else {
    return null;
  }
};

export default AnchorTag;
