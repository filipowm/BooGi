
import * as SocialButtons from '../Buttons/Social';

const SocialButtonsBuilder = (baseProps) => {
    const iconBaseProps = baseProps;
    const buttons = [];
    const create = (config, name, linkFn, titleFn) => {
        if (config && config.length > 0) {
            const btn = SocialButtons[name];
            if (btn) {
                const link = linkFn(config);
                const title = titleFn ? titleFn(name) : `Follow on ${name}`;
                buttons.push(btn({link: link, key: `${name}-social`, title: title, ...iconBaseProps}))
            }
        }
    }
    const get = () => buttons;
    return {
        get: get,
        create: create
    }
}

export default (iconBaseProps, socialConfig) => {
    const buttons = new SocialButtonsBuilder(iconBaseProps);
    buttons.create(socialConfig.facebook, 'Facebook', link => link);
    buttons.create(socialConfig.github, 'Github', link => link);
    buttons.create(socialConfig.gitlab, 'Gitlab', link => link);
    buttons.create(socialConfig.instagram, 'Instagram', link => link);
    buttons.create(socialConfig.linkedin, 'Linkedin', link => link);
    buttons.create(socialConfig.mail, 'Mail', address => `mailto:${address}`, name => `Send email to owner`);
    buttons.create(socialConfig.gmail, 'Mail', address => `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${address}`, name => `Send email to owner`);
    buttons.create(socialConfig.slack, 'Slack', link => link);
    buttons.create(socialConfig.twitch, 'Twitch', link => link);
    buttons.create(socialConfig.twitter, 'Twitter', link => link);
    buttons.create(socialConfig.youtube, 'Youtube', link => link);
    return buttons.get();
  };