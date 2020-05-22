import React from "react";
import CodeBlock from "./codeBlock";
import AnchorTag from "./anchor";
import Layout from "./layout";
import Highlights from "./highlights";
import 'css';
import Icon from "./icon";
import Badge from "./badge";
import Jargon from "./jargon";
import {blockquote} from "../../styles/base";
import {useTheme} from "emotion-theming";

const Header = (level, props) => {
  let name = props.children;
  if (Array.isArray(name)) {
    name = props.children[0]
  }
  name = name.replace(/\s+/g, '').toLowerCase();
  return React.createElement("h" + level, { className: "heading" + level, id: name, ...props});
};

export default {
  h1: props => Header(1, props),
  h2: props => Header(2, props),
  h3: props => Header(3, props),
  h4: props => Header(4, props),
  h5: props => Header(5, props),
  h6: props => Header(6, props),
  blockquote: props => <blockquote css={blockquote(useTheme())} {...props} />,
  p: props => <p className='paragraph' {...props} />,
  pre: props => <pre className='pre' {...props} />,
  em: Jargon,
  code: CodeBlock,
  a: AnchorTag,
  Badge,
  Layout,
  Icon,
  ...Highlights,
};
