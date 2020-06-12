import React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Hit } from '../Hits';
import emoji from 'node-emoji';

export const PageHit = ({ hit }) => {
  hit._highlightResult.title.value = emoji.emojify(
    hit._highlightResult.title.value,
    (name) => name
  );
  hit._snippetResult.excerpt.value = emoji.emojify(
    hit._snippetResult.excerpt.value,
    (name) => name
  );
  return (
    <Hit
      slug={hit.slug}
      title={<Highlight attribute="title" hit={hit} tagName="mark" />}
      details={<Snippet attribute="excerpt" hit={hit} tagName="mark" />}
    />
  );
};
