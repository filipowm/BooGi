/* eslint-disable react/display-name */
import React from 'react';
import CodeBlock from './codeBlock';
import AnchorTag from './anchor';
import Layout from './layout';
import Highlights from './highlights';
import Icon from './icon';
import Badge from './badge';
import Jargon from './jargon';
import { blockquote, pre, table, list } from '../../styles';
import { useTheme } from 'emotion-theming';

const idFromHeader = (props) => {
  let name = props.children;
  if (Array.isArray(name)) {
    name = props.children[0];
  }
  return name.replace(/\s+/g, '').toLowerCase();
};
const Header = (level, props) => {
  let name = idFromHeader(props);
  return React.createElement('h' + level, {
    className: 'heading' + level,
    id: 'h-' + name,
    ...props,
  });
};

const Section = (props) => {
  let header = '';
  if (Array.isArray(props.children)) {
    header = props.children[0].props;
  } else {
    header = props.children.props;
  }
  const name = idFromHeader(header);
  return <section id={name} {...props} />;
};

const emphasis = (props) => {
  const useJargon = !(typeof props.children === 'string');
  if (useJargon) {
    return <Jargon {...props} />;
  }
  return <em {...props} />;
}

export default {
  h1: (props) => Header(1, props),
  h2: (props) => Header(2, props),
  h3: (props) => Header(3, props),
  h4: (props) => Header(4, props),
  h5: (props) => Header(5, props),
  h6: (props) => Header(6, props),
  section: (props) => Section(props),
  blockquote: (props) => <blockquote css={blockquote(useTheme())} {...props} />,
  p: (props) => <p className="paragraph" {...props} />,
  pre: (props) => <pre css={pre} {...props} />,
  table: (props) => <table css={table(useTheme())} {...props} />,
  em: emphasis,
  img: (props) => <a href={props.src} target="_blank" rel="noopener noreferrer"><img {...props} /></a>,
  code: CodeBlock,
  ul: (props) => <ul css={list} {...props} />,
  ol: (props) => <ol css={list} {...props} />,
  a: AnchorTag,
  Badge,
  Layout,
  Icon,
  ...Highlights,
};
