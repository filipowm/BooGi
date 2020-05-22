import React from "react";
import styled from "@emotion/styled";

const logo = require('images/gitlab.svg');
const Trademark = styled(({className, trademark}) => {
  console.log(trademark)
  return <div className={className}><img src={trademark} /></div>
})`
display: flex;
img {
  svg * {
    color: ${props => props.theme.navigationSidebar.poweredBy.hover};
  }
  width: 25px;
}
`
;

const PoweredText = styled(({className, text}) =>
  <div className={className}>
    <span>Powered By <b>{text}</b></span>
  </div>
)`
padding-left: 20px;
span {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 1.625;
}
`;

const PoweredBy = styled(({className, trademark, name, link}) =>
  <div css={{margin: '0 auto', width: 'fit-content'}}>
    <a className={className} href={link} target="_blank" rel="noopener">
      <Trademark trademark={trademark}/>
      <PoweredText text={name}/>
    </a>
  </div>
)`
color: ${props => props.theme.navigationSidebar.poweredBy.font};
margin: 12px;
display: flex;
align-items: center;
margin-left: 0px;
padding: 12px 18px;
border-radius: 4px;
text-decoration: none;
background-color: ${props => props.theme.navigationSidebar.poweredBy.background};
transition: ${props => props.theme.transitions.hoverFast2};
&:hover {
  border: 1px solid ${props => props.theme.navigationSidebar.poweredBy.hover};
  margin-top: 11px;
  color: ${props => props.theme.navigationSidebar.poweredBy.hover};
}
@media(max-width: ${props => props.theme.breakpoints['small']}) {
  display: none;
}
`;

export default PoweredBy;
