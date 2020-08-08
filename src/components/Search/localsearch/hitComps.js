import React from 'react';
import { Hit } from '../Hits';
import emoji from '../../../utils/emoji';
import styled from '@emotion/styled';

const trim_words = (str, numWords) => {
  const expString = str.split(/\s+/,numWords);
  return expString.join(" ");
}

const reverse = (str) => str.split("").reverse().join("");

const onReversed = (str, func) => {
  const reversed = reverse(str);
  const transformed = func(reversed);
  return reverse(transformed);
}

const Highlight = styled.span`
background-color: ${(props) => props.theme.search.mark.background};
color: ${(props) => props.theme.search.mark.font};
`;

const highlight = (query, text, maxWords) => {
  const regex = new RegExp(query, "i")
  const startPos = text.search(regex);
  if (startPos < 0) {
    return trim_words(text, maxWords);
  }
  const qLength = query.length;
  const boundary = Math.ceil((maxWords - 1) / 2);
  let beforeText = text.substring(0, startPos);
  beforeText = onReversed(beforeText, (reversed) => trim_words(reversed, boundary));
  beforeText = emoji.emojify(beforeText);
  let afterText = text.substring(startPos + qLength);
  afterText = trim_words(afterText, boundary);
  afterText = emoji.emojify(afterText);
  return <>
    <span>{beforeText}</span>
    <Highlight>{emoji.emojify(query)}</Highlight>
    <span>{afterText}</span>
  </>
}

export const PageHit = ({ hit, q, maxWords }) => {
  return (
    <li>
      <Hit
        slug={hit.slug}
        title={emoji.emojify(hit.title)}
        details={hit.excerpt ? highlight(q, hit.excerpt, maxWords): ''}
      />
    </li>
  );
};
