import React from 'react';
import styled from '@emotion/styled';

const LayoutEl = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align};
  &.spacing-xlarge > * {
    margin: 64px 64px 64px 0;
  }
  &.spacing-large > * {
    margin: 32px 32px 32px 0;
  }
  &.spacing-medium > * {
    margin: 16px 16px 16px 0;
  }
  &.spacing-small > * {
    margin: 8px 8px 8px 0;
  }
  &.spacing-xsmall > * {
    margin: 4px 4px 4px 0;
  }
  & > * {
    flex: 1 1 0px;
  }
`;
const Layout = ({ children, spacing, ...props }) => {
  let space = spacing || 'medium';
  return (
    <LayoutEl className={'spacing-' + space} {...props}>
      {children}
    </LayoutEl>
  );
};

export default Layout;
