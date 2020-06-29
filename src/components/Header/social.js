import * as SocialButtons from '../Buttons/Social';

const SocialButtonsBuilder = (baseProps) => {
  const iconBaseProps = baseProps;
  const buttons = [];
  const create = (config, name, optConfig) => {
    if (config && config.length > 0) {
      const btn = SocialButtons[name];
      if (btn) {
        const link = optConfig && optConfig.linkFn ? optConfig.linkFn(config) : config;
        const title =
          optConfig && optConfig.titleFn ? optConfig.titleFn(name) : `Follow on ${name}`;
        const additionalProps =
          optConfig && optConfig.additionalProps ? optConfig.additionalProps : {};
        buttons.push(
          btn({
            link: link,
            key: `${name}-social`,
            title: title,
            ...iconBaseProps,
            ...additionalProps,
          })
        );
      }
    }
  };
  const get = () => buttons;
  return {
    get: get,
    create: create,
  };
};

export default (iconBaseProps, socialConfig) => {
  const buttons = SocialButtonsBuilder(iconBaseProps);
  buttons.create(socialConfig.facebook, 'Facebook');
  buttons.create(socialConfig.github, 'Github');
  buttons.create(socialConfig.gitlab, 'Gitlab');
  buttons.create(socialConfig.instagram, 'Instagram');
  buttons.create(socialConfig.linkedin, 'Linkedin', {
    additionalProps: {
      fill: iconBaseProps.stroke,
      hoverFill: iconBaseProps.hoverStroke,
    },
  });
  buttons.create(socialConfig.mail, 'Mail', {
    linkFn: (address) => `mailto:${address}`,
    titleFn: (name) => `Send email to owner`,
  });
  buttons.create(socialConfig.gmail, 'Mail', {
    linkFn: (address) => `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${address}`,
    titleFn: (name) => `Send email to owner`,
  });
  buttons.create(socialConfig.slack, 'Slack');
  buttons.create(socialConfig.twitch, 'Twitch');
  buttons.create(socialConfig.twitter, 'Twitter', {
    additionalProps: {
      fill: iconBaseProps.stroke,
      hoverFill: iconBaseProps.hoverStroke,
    },
  });
  buttons.create(socialConfig.youtube, 'Youtube');
  return buttons.get();
};
