import React, { useEffect } from 'react';
import { Link } from '../';
import styled from '@emotion/styled';
import emoji from '../../utils/emoji';
import { navigate } from 'gatsby';
import config from 'config';
import { ChevronLeft, ChevronRight } from 'react-feather'

import { calculateFlatNavigation, getNavigationData } from '../Navigation';
import { onMobile } from '../../styles/responsive';

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
  grid-template-columns: calc(50% - 12px) calc(50% - 12px);
`;

const Arrow = styled(({ className, arrow }) => <div className={className}>{arrow.render({color: ''})}</div>)`
  display: block;
  margin: 0;
  flex: 0 0 auto;
  font-size: 16pt;
  transition: color 200ms ease 0s;
  padding: 16px;
  
  ${onMobile} {
    padding: 6px;
  }
  svg {
    stroke: ${(props) => props.theme.previousNext.font};
  }
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
  ${onMobile} {
    padding: 6px;
  }
`;

const LeftButton = ({ url, title, label }) => {
  return (
    <Button url={url}>
      <Arrow arrow={ChevronLeft} />
      <ContentWrapper title={title} label={label} css={{ textAlign: 'right' }} />
    </Button>
  );
};

const RightButton = ({ url, title, label }) => {
  return (
    <Button url={url}>
      <ContentWrapper title={title} label={label} />
      <Arrow arrow={ChevronRight} />
    </Button>
  );
};

const Button = styled(({ className, url, children }) => {
  return (
    <Link to={url ? url : '#'} className={className}>
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
  visibility: ${(props) => props.url ? 'visible' : 'hidden'};
  opacity: ${(props) => props.url ? 1 : 0};

  &:hover {
    color: ${(props) => props.theme.previousNext.hover};
    text-decoration: none;
    border: 1px solid ${(props) => props.theme.previousNext.hover};
    svg * {
      stroke: ${(props) => props.theme.previousNext.hover};
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
  const previousLabel = `${previous.path ? previous.path + conf.pathDivider : ''} ${
    conf.previousName
  }`;
  const nextLabel = `${conf.nextName} ${next.path ? conf.pathDivider + next.path : ''}`;
  return (
    <PreviousNextWrapper>
      {currentIndex >= 0 ? (
        <>
          <LeftButton url={previous.url} title={previous.title} label={previousLabel} />
          <RightButton url={next.url} title={next.title} label={nextLabel} />
        </>
      ) : null}
    </PreviousNextWrapper>
  );
};

export default PreviousNext;
