import React from 'react';
import Link from '../link';
import styled from '@emotion/styled';
import emoji from 'node-emoji';

import { calculateFlatNavigation, getNavigationData } from '../navigation';

const NextPreviousWrapper = styled.div`
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
  color: rgb(157, 170, 182);
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
  color: #6e6e6e;

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
        <span>{emoji.emojify(title, (name) => name)}</span>
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
  color: rgb(36, 42, 49);
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  border: 1px solid rgb(230, 236, 241);
  transition: border 200ms ease 0s;
  box-shadow: rgba(116, 129, 141, 0.1) 0 3px 8px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.blue};
    text-decoration: none;
    border: 1px solid ${(props) => props.theme.colors.blue};
    svg * {
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const calculateNextPrevious = (nav, index) => {
  const nextInfo = {};
  const previousInfo = {};
  let currentIndex = index;
  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url;
      nextInfo.title = nav[0].title;
    }
    previousInfo.url = null;
    previousInfo.title = null;
    currentIndex = -1;
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null;
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null;
    previousInfo.url = null;
    previousInfo.title = null;
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null;
    nextInfo.title = null;
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null;
    previousInfo.title = nav[currentIndex - 1] ? nav[currentIndex - 1].title : null;
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url;
    nextInfo.title = nav[currentIndex + 1].title;
    if (nav[currentIndex - 1]) {
      previousInfo.url = nav[currentIndex - 1].url;
      previousInfo.title = nav[currentIndex - 1].title;
    }
  }
  return [previousInfo, nextInfo];
};

const nextPrevious = ({ mdx }) => {
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
  const [previous, next] = calculateNextPrevious(navigation, currentIndex);
  return (
    <NextPreviousWrapper>
      {currentIndex >= 0 ? (
        <>
          {previous.url ? (
            <LeftButton url={previous.url} title={previous.title} label={'Previous'} />
          ) : null}
          {next.url ? (
            <RightButton
              url={next.url}
              title={navigation[currentIndex + 1] && next.title}
              label={'Next'}
            />
          ) : null}
        </>
      ) : null}
    </NextPreviousWrapper>
  );
};

export default nextPrevious;
