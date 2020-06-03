import React from 'react';
import { Link } from '$components';
import 'css';
import styled from '@emotion/styled';
import { shadowAround } from '../../styles/base';

const Edit = styled('div')`
  padding: 0 16px;
  text-align: right;
  a {
    font-weight: 500;
    line-height: 1em;
    cursor: pointer;
    align-items: center;
    min-width: 175px;
    outline: none;
    transition: ${(props) => props.theme.transitions.hover};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.color};
    background-color: ${(props) => props.theme.colors.white};
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      border-color: ${(props) => props.theme.colors.primaryDark};
      color: ${(props) => props.theme.colors.border};
    }
  }
`;

const EditButton = styled(({ className, icon, link, text }) => {
  return (
    <Edit className={'mobileView'}>
      <Link className={className} to={link} css={shadowAround} target={'_blank'}>
        <img src={icon} alt={'Git Repository'} /> {text}
      </Link>
    </Edit>
  );
})`
  height: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.small}) {
    width: fit-content;
  }
  img {
    width: 20px;
    display: inline-block;
    margin-right: 10px;
  }
`;

const EditOnRepo = ({ repoType, branch, location, path }) => {
  let icon = null;
  let link = `${location}/${path}`;
  let text = 'Edit on ';
  switch (repoType.toLowerCase()) {
    case 'gitlab':
      icon = require('images/gitlab.svg');
      const splitted = location.split('/');
      const protocol = splitted[0];
      const host = splitted[2];
      // it does not support contexts
      const repo = splitted.slice(3).join('/');
      link = `${protocol}//${host}/-/ide/project/${repo}/blob/${branch}/-/${path}`;
      text += 'GitLab';
      break;
    case 'github':
      icon = require('images/github.svg');
      link = `${location}/edit/${branch}/${path}`;
      text += 'Github';
      break;
    case 'bitbucket':
      icon = require('images/bitbucket.svg');
      link = `${location}/src/${branch}/${path}?mode=edit&spa=0&at=${branch}`;
      text += 'Bitbucket';
      break;
    default:
      console.log(`Repository type ${repoType} is not supported by edit on repo feature`);
      return '';
  }
  return <EditButton icon={icon} link={link} text={text} />;
};
export default EditOnRepo;
