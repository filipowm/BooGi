import React from "react"
import styled from "@emotion/styled"
import {useTheme} from "emotion-theming";
import {AlertCircle, AlertOctagon, AlertTriangle} from "react-feather";
import {css} from "@emotion/core";

const skipParagraph = css`
.paragraph {
  &:first-child {
    margin-top: 0
  }
  &:last-child {
    margin-bottom: 0;
  }
}
`

const HighlightWrapper = styled(({className, children}) =>
  <div className={className}>
      {children}
  </div>
)`
margin: 16px 0;
padding: 14px;
border: 1px solid ${props => props.border};
background-color: ${props => props.background};
color: ${props => props.font};
align-items: center;
display: flex;
border-radius: 4px;
`;


const Highlight = ({children, border, background, font, icon, ...props}) => {
  const theme = useTheme();
  const borderColor = theme.colors[border];
  const backgroundColor = theme.colors[background];
  const fontColor = theme.colors[(font || theme.colors.color)];
  return (
    <HighlightWrapper background={backgroundColor} border={borderColor} font={fontColor}{...props} >
      <div css={{marginRight: '16px', lineHeight: 0}}>
        {icon.render({color: borderColor, size: 24})}
      </div>
      <div css={skipParagraph}>
        {children}
      </div>
    </HighlightWrapper>
  )
};

export default {
  Note: props => Highlight({
    border: 'orange',
    icon: AlertTriangle,
    background: 'orangeLight',
    ...props
  }),
  Warning: props => Highlight({
    border: 'red',
    icon: AlertOctagon,
    background: 'redLight',
    ...props
  }),
  Info: props => Highlight({
    border: 'blue',
    icon: AlertCircle,
    background: 'blueLight',
    ...props
  }),
  Tip: props => Highlight({
    border: 'green',
    icon: AlertCircle,
    background: 'greenLight',
    ...props
  })
}
