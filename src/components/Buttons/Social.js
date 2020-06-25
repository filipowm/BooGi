import PropTypes from 'prop-types';
import ButtonIcon from './ButtonIcon';
import { Link } from '../';
import {
  Facebook as FB,
  GitHub as GH,
  Gitlab as GL,
  Instagram as IN,
  Linkedin as LI,
  Mail as MA,
  Rss as RS,
  Slack as SL,
  Twitch as TC,
  Twitter as TW,
  Youtube as YT,
} from 'react-feather';

const SocialButton = ({ link, ...props }) => {
  // const theme = useTheme();
  return (
    <Link to={link} target={'_blank'} rel={'noopener noreferrer'}>
      <ButtonIcon {...props} />
    </Link>
  );
};

SocialButton.propTypes = {
  background: PropTypes.string,
  hoverFill: PropTypes.string,
  hoverStroke: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

export const Facebook = (props) => <SocialButton icon={FB} {...props} />;
export const Github = (props) => <SocialButton icon={GH} {...props} />;
export const Gitlab = (props) => <SocialButton icon={GL} {...props} />;
export const Instagram = (props) => <SocialButton icon={IN} {...props} />;
export const Linkedin = (props) => <SocialButton icon={LI} {...props} />;
export const Mail = (props) => <SocialButton icon={MA} {...props} />;
export const Rss = (props) => <SocialButton icon={RS} {...props} />;
export const Slack = (props) => <SocialButton icon={SL} {...props} />;
export const Twitch = (props) => <SocialButton icon={TC} {...props} />;
export const Twitter = (props) => <SocialButton icon={TW} {...props} />;
export const Youtube = (props) => <SocialButton icon={YT} {...props} />;
