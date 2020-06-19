import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import { Layout, EditOnRepo, PreviousNext, Seo } from '$components';
import config from 'config';
import emoji from 'node-emoji';

const Title = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid ${(props) => props.theme.colors.primary};
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
`;

const PageTitle = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid ${(props) => props.theme.content.border};
  margin-bottom: 20px;
  color: ${(props) => props.theme.content.titleFont};
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    padding: 0 15px;
    display: block;
  }
`;

const TitleWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.content.font};
  code {
    background: ${(props) => props.theme.content.code.background};
    border: 1px solid ${(props) => props.theme.content.code.border};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;
    color: ${(props) => props.theme.content.code.font};
  }
  ul,
  ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 24px 0px;
    padding: 0px 0px 0px 2em;
  }

  ul li,
  ol li {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }
`;

const ReadingTime = styled(({ className, time }) => (
  <span className={className}>Reading time: {time} min</span>
))`
  font-style: italic;
  font-size: 12px;
`;

const LastUpdated = styled(({ className, time, name }) => {
  return (
    <span className={className}>
      Last update:{' '}
      <i>
        <b>{time}</b>
      </i>{' '}
      by
      <i>
        <b> {name}</b>
      </i>
    </span>
  );
})`
  font-size: 12px;
  display: block;
`;

export default class MDXRuntimeTest extends React.Component {
  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const {
      mdx,
      site: {
        siteMetadata: { docsLocation, docsLocationType, editable },
      },
      gitBranch,
    } = data;

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;
    const docTitle = emoji.emojify(mdx.fields.title, (name) => name);
    const headTitle = metaTitle ? metaTitle : emoji.strip(docTitle);
    return (
      <Layout {...this.props}>
        <Seo frontmatter={mdx.frontmatter} 
             url={this.props.location.href}
             title={headTitle} />
        <PageTitle>
          <TitleWrapper>
            <Title>{docTitle}</Title>
            {(editable && mdx.frontmatter.editable != false) ||
            mdx.frontmatter.editable ? (
              <EditOnRepo
                location={docsLocation}
                branch={gitBranch.name}
                path={mdx.parent.relativePath}
                repoType={docsLocationType}
              />
            ) : (
              ''
            )}
          </TitleWrapper>
          {(config.features.showMetadata === true && mdx.frontmatter.showMetadata !== false) ||
          mdx.frontmatter.showMetadata === true ? (
            <div css={{ display: 'block' }}>
              {mdx.parent.fields ? (
                <LastUpdated
                  time={mdx.parent.fields.gitLogLatestDate}
                  name={mdx.parent.fields.gitLogLatestAuthorName}
                  email={mdx.parent.fields.gitLogLatestAuthorEmail}
                />
              ) : (
                ''
              )}
              <ReadingTime time={mdx.timeToRead * 2} />
            </div>
          ) : (
            ''
          )}
        </PageTitle>
        <ContentWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </ContentWrapper>
        {(config.features.previousNext.enabled === true &&
          mdx.frontmatter.showPreviousNext !== false) ||
        mdx.frontmatter.showPreviousNext ? (
          <div css={{ padding: '50px 0' }}>
            <PreviousNext mdx={mdx} />
          </div>
        ) : (
          ''
        )}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
        docsLocationType
        editable
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      timeToRead
      parent {
        ... on File {
          relativePath
          fields {
            gitLogLatestAuthorName
            gitLogLatestAuthorEmail
            gitLogLatestDate(fromNow: true)
          }
        }
      }
      frontmatter {
        metaTitle
        showMetadata
        editable
        showPreviousNext
        skipToC
      }
    }
    gitBranch {
      name
    }
    gitCommit(latest: { eq: true }) {
      hash
      date(formatString: "YYYY-MM-DD hh:mm")
    }
  }
`;
