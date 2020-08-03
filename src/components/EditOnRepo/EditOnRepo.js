/* eslint-disable no-case-declarations */
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { Link } from '../';
import { shadowAround } from '../../styles';
import { onTablet, onMobile } from '../../styles/responsive';

const Edit = styled('div')`
  text-align: right;
  ${onMobile} {
    padding-left: 0;
  }
  a {
    ${onTablet} {
      padding: 5px 12px;
      min-width: auto;
      font-size: 14px;
      font-weight: 400;
    }
    ${onMobile} {
      padding: 4px 8px;
      font-size: 13px;
    }
    font-weight: 500;
    line-height: 1em;
    cursor: pointer;
    align-items: center;
    min-width: 175px;
    outline: none;
    transition: ${(props) => props.theme.transitions.hover};
    border: 1px solid ${(props) => props.theme.editOnRepo.border};
    border-radius: 4px;
    color: ${(props) => props.theme.editOnRepo.font.base};
    background-color: ${(props) => props.theme.editOnRepo.background};
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: ${(props) => props.theme.editOnRepo.hover};
      color: ${(props) => props.theme.editOnRepo.font.hover};
    }
  }
`;

const EditButton = styled(({ className, icon, link, text }) => {
  return (
    <Edit>
      <Link className={className} to={link} css={shadowAround} target={'_blank'}>
        <img src={icon} alt={'Git Repository'} loading={'lazy'} /> 
        <span>{text}</span>
      </Link>
    </Edit>
  );
})`
  height: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  ${onTablet} {
    height: 37px;
    min-height: 37px;
  }
  ${onMobile} {
    height: 32px;
    min-height: 32px;
  }
  img {
    width: 20px;
    display: inline-block;
    margin-right: 10px;
  }
`;

const rootDir = 'content';

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
      link = `${protocol}//${host}/-/ide/project/${repo}/blob/${branch}/-/${rootDir}/${path}`;
      text += 'GitLab';
      break;
    case 'github':
      icon = require('images/github.svg');
      link = `${location}/edit/${branch}/${rootDir}/${path}`;
      text += 'Github';
      break;
    case 'bitbucket':
      icon = require('images/bitbucket.svg');
      link = `${location}/src/${branch}/${rootDir}/${path}?mode=edit&spa=0&at=${branch}`;
      text += 'Bitbucket';
      break;
    default:
      console.log(`Repository type ${repoType} is not supported by edit on repo feature`);
      return '';
  }
  return <EditButton icon={icon} link={link} text={text} />;
};

EditOnRepo.propTypes = {
  repoType: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default EditOnRepo;
