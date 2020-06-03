import { ExternalLink } from 'react-feather';
import React from 'react';
import styled from '@emotion/styled';
import { flex, transparent } from '../../styles/base';

const Link = styled(({ className, to, text }) => {
  return (
    <li className={className}>
      <a href={to} target={'_blank'} css={flex} rel={'noreferrer'}>
        {text}
        <button css={transparent}>
          <ExternalLink size={14} />
        </button>
      </a>
    </li>
  );
})`
  list-style: none;
  a {
    font-size: 14px;
    color: ${(props) => props.theme.navigationSidebar.font.base};
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem 16px;
    button svg * {
      color: ${(props) => props.theme.navigationSidebar.font.base};
    }
    &:hover {
      color: ${(props) => props.theme.navigationSidebar.font.hover};
      button svg * {
        color: ${(props) => props.theme.navigationSidebar.font.hover};
      }
    }
    button {
      padding: 0 25px 0 10px;
      cursor: pointer;
    }
  }
`;

const Links = ({ links }) => (
  <ul>
    {links.map((link, key) => {
      if (link.link !== '' && link.text !== '') {
        return <Link key={key} to={link.link} text={link.text} />;
      }
    })}
  </ul>
);

export default Links;
