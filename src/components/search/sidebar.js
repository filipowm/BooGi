import React from "react"

import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {shadowAround} from "../../styles/base";
import {useTheme} from "emotion-theming";
import {Slide} from "react-reveal";
import {Hits} from "react-instantsearch-dom";
import * as hitComps from "../_algoliaold/hitComps";
import config from 'config';
import Search from "./algolia";
import SearchBox from "./input";

const SearchWrapper = styled.div`
height: 100vh;
overflow: scroll;
-webkit-overflow-scrolling: touch;
position: fixed;
right: 0;
left: auto;
top: 0;
width: 460px;
box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
background: white;
display: flex;
flex-direction: column;
`;

const HitsWrapper = styled.div`
margin-top: 69px;
padding: 20px;
border-top: 1px solid ${props => props.theme.colors.border};
`;

const SearchSidebar2 = styled.div`
display : ${props => props.show ? 'block' : 'none'};
z-index: 200;
`;

const SearchSidebar = ({search, show, ...props}) => {
  const theme = useTheme();
  return (
    <SearchSidebar2 show={show} onBlur={() => setShow(false)}>
      <Slide right delay={0} duration={500} when={show}>
        <SearchWrapper show={show} {...props}>
          <div css={{height: '79px'}}>
            <SearchBox />
          </div>
          <HitsWrapper>
          </HitsWrapper>
        </SearchWrapper>
      </Slide>
    </SearchSidebar2>
  )
};

export default SearchSidebar;
