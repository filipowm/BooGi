import React, { useEffect } from 'react';
import { Link } from '../';
import styled from '@emotion/styled';
import emoji from '../../utils/emoji';
import { navigate } from 'gatsby';
import config from 'config';

import { calculateFlatNavigation, getNavigationData } from '../Navigation';

const conf = {
  pathDivider: ' — ',
  previousName: 'Previous',
  nextName: 'Next',
};

const PreviousNextWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: auto;
  display: grid;
  grid-template-rows: auto;
  column-gap: 24px;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
`;

const LeftArrow = () => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke="currentColor"
    className="_13gjrqj"
  >
    <g>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
  </svg>
);
const RightArrow = () => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke="currentColor"
    className="_13gjrqj"
  >
    <g>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </g>
  </svg>
);
const Arrow = styled(({ className, arrow }) => <div className={className}>{arrow()}</div>)`
  display: block;
  margin: 0;
  color: ${(props) => props.theme.previousNext.font};
  flex: 0 0 auto;
  font-size: 24px;
  transition: color 200ms ease 0s;
  padding: 16px;
`;

const Title = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  transition: color 200ms ease 0s;

  span {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
  }
`;

const Label = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.previousNext.fontLabel};

  span {
    font-size: 12px;
    line-height: 1.625;
    font-weight: 400;
  }
`;

const ContentWrapper = styled(({ className, label, title }) => {
  return (
    <div className={className}>
      <Label>
        <span>{label}</span>
      </Label>
      <Title>
        <span>{emoji.emojify(title)}</span>
      </Title>
    </div>
  );
})`
  display: block;
  margin: 0;
  flex: 1 1 0%;
  padding: 16px;
`;

const LeftButton = ({ url, title, label }) => {
  return (
    <Button url={url}>
      <Arrow arrow={LeftArrow} />
      <ContentWrapper title={title} label={label} css={{ textAlign: 'right' }} />
    </Button>
  );
};

const RightButton = ({ url, title, label }) => {
  return (
    <Button url={url}>
      <ContentWrapper title={title} label={label} />
      <Arrow arrow={RightArrow} />
    </Button>
  );
};

const Button = styled(({ className, url, children }) => {
  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  );
})`
  cursor: pointer;
  -moz-box-align: center;
  -moz-box-direction: normal;
  -moz-box-orient: horizontal;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  place-self: stretch;
  color: ${(props) => props.theme.previousNext.font};
  background-color: ${(props) => props.theme.previousNext.background};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.previousNext.border};
  transition: border 200ms ease 0s;
  box-shadow: ${(props) => props.theme.previousNext.shadow} 0 3px 8px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.previousNext.hover};
    text-decoration: none;
    border: 1px solid ${(props) => props.theme.previousNext.hover};
    svg * {
      color: ${(props) => props.theme.previousNext.hover};
    }
  }
`;

const calculatePreviousNext = (nav, index) => {
  const nextInfo = {};
  const previousInfo = {};
  let currentIndex = index;
  const set = (nav, info) => {
    if (nav) {
      info.url = nav.url;
      info.title = nav.title;
      info.path = emoji.emojify(nav.groupName);
    }
  };
  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url;
      nextInfo.title = nav[0].title;
      nextInfo.path = nav[0].groupName;
    }
    previousInfo.url = null;
    previousInfo.title = null;
    currentIndex = -1;
  } else {
    const next = nav[currentIndex + 1] ? nav[currentIndex + 1] : null;
    const previous = nav[currentIndex - 1] ? nav[currentIndex - 1] : null;
    set(next, nextInfo);
    set(previous, previousInfo);
  }
  return [previousInfo, nextInfo];
};

const setArrowNavigation = (previous, next) => {
  useEffect(() => {
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '37' && previous.url) {
        // left arrow
        navigate(previous.url);
      } else if (e.keyCode == '39' && next.url) {
        // right arrow
        navigate(next.url);
      }
    };
  }, [previous, next]);
};

const PreviousNext = ({ mdx }) => {
  const edges = getNavigationData();
  const navigation = calculateFlatNavigation(edges);
  let currentIndex;
  navigation.every((el, index) => {
    if (el && el.url === mdx.fields.slug) {
      currentIndex = index;
      return false;
    }
    return true;
  });
  const [previous, next] = calculatePreviousNext(navigation, currentIndex);

  if (config.features.previousNext.arrowKeyNavigation === true) {
    setArrowNavigation(previous, next);
  }
  const previousLabel = `${previous.path ? previous.path + conf.pathDivider : ''} ${conf.previousName}`;
  const nextLabel = `${conf.nextName} ${next.path ? conf.pathDivider + next.path : ''}`;
  return (
    <PreviousNextWrapper>
      {currentIndex >= 0 ? (
        <>
          {previous.url ? (
            <LeftButton url={previous.url} title={previous.title} label={previousLabel} />
          ) : null}
          {next.url ? (
            <RightButton
              url={next.url}
              title={next.title}
              label={nextLabel}
            />
          ) : null}
        </>
      ) : null}
    </PreviousNextWrapper>
  );
};

export default PreviousNext;
