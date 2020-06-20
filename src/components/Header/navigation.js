import React from 'react';
import styled from '@emotion/styled';

const Navigation = styled(({ className, links }) => {
  return (
    <nav>
      <ul className={className}>
        {links
          ? links.map((link, key) => {
              const openRule = link.external ? '_blank' : '_self';
              if (link.link !== '' && link.text !== '') {
                return (
                  <li key={key}>
                    <a
                      href={link.link}
                      target={openRule}
                      rel="noopener"
                      dangerouslySetInnerHTML={{ __html: link.text }}
                    />
                  </li>
                );
              }
            })
          : null}
      </ul>
    </nav>
  );
})`
  display: flex;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  float: left;
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    position: static;
    display: none;
    align-items: center;
    margin: 7.5px 0;

    li {
      height: 37px;

      a {
        font-size: 14px;
        padding: 10px 15px;
      }
    }
  }
  li {
    list-style-type: none;
    & > a:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      left: 0;
      background: ${(props) => props.theme.header.font.hover};
      visibility: hidden;
      border-radius: 4px;
      transform: scaleX(0);
      transition: 0.25s linear;
    }
    & > a:focus:before,
    & > a:hover:before {
      visibility: visible;
      transform: scaleX(1);
    }
    a {
      font-family: 'Roboto';
      color: ${(props) => props.theme.header.font.base};
      font-size: 16px;
      font-weight: 500;
      line-height: 1em;
      opacity: 1;
      padding: 10px 15px;
      &:hover {
        color: ${(props) => props.theme.header.font.hover};
      }
    }
  }
`;

export default Navigation;
