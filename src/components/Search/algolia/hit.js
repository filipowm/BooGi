import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Hit = (props) => {
  const { classes, hit } = props;

  return (
    <Link to={hit.fields.slug} className={classes.link}>
      {hit.frontmatter.title}
      {hit.frontmatter.subTitle && <span>{hit.frontmatter.subTitle}</span>}
    </Link>
  );
};

Hit.propTypes = {
  classes: PropTypes.object.isRequired,
  hit: PropTypes.object.isRequired,
};

export default Hit;
