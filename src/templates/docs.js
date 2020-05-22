import React, {Component} from "react";
import Helmet from "react-helmet";
import {graphql} from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import styled from "@emotion/styled";
import {Layout} from "$components";
import NextPrevious from '$components/nextPrevious';
import config from 'config';
import EditOnRepo from '$components/gitlab'

const forcedNavOrder = config.sidebar.forcedNavOrder;

const Title = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid ${props => props.theme.colors.primary};
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
`;

const PageTitle = styled.div`
display: flex;
flex-flow: wrap;
align-items: center;
padding-bottom: 30px;
border-bottom: 1px solid rgb(230, 236, 241);
margin-bottom: 20px;
@media(max-width: ${props => props.theme.breakpoints['small']}) {
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
color: ${props => props.theme.colors.color};
  // max-width: 750px;
  code {
    background: #f9f7fb;
    border: 1px solid #ede7f3;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;
  }
  ul, ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 24px 0px;
    padding: 0px 0px 0px 2em;
  }

  ul li, ol li {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }
`;

const ReadingTime = styled(({className, time}) => <span className={className}>Reading time: {time} min</span>)`
font-style: italic;
font-size: 12px;
`;

const LastUpdated = styled(({className, time, name, email}) => {
  return <span className={className}>
    Last update: <i><b>{time}</b></i> by 
    <i><b> {name}</b></i>
  </span>
})`
font-size: 12px;
display: block;
`;

export default class MDXRuntimeTest extends Component {
  render() {
    const {data} = this.props;
    if (!data) {
      return null;
    }
    const {
      allMdx,
      mdx,
      site: {
        siteMetadata: {docsLocation, docsLocationType, title}
      },
      gitBranch
    } = data;

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;
    const metaDescription = mdx.frontmatter.metaDescription;
    let canonicalUrl = config.metadata.url;
    canonicalUrl = config.metadata.pathPrefix !== '/' ? canonicalUrl + config.metadata.pathPrefix : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    return (
      <Layout {...this.props}>
        <Helmet>
          {metaTitle ? <title>{metaTitle}</title> : null}
          {metaTitle ? <meta name="title" content={metaTitle}/> : null}
          {metaDescription ? <meta name="description" content={metaDescription}/> : null}
          {metaTitle ? <meta property="og:title" content={metaTitle}/> : null}
          {metaDescription ? <meta property="og:description" content={metaDescription}/> : null}
          <link rel="canonical" href={canonicalUrl}/>
        </Helmet>
        <PageTitle>
          <TitleWrapper>
            <Title>{mdx.fields.title}</Title>
            {(config.metadata.editable && mdx.frontmatter.editable != false) 
            || (mdx.frontmatter.editable)  ?
              <EditOnRepo location={docsLocation} 
                          branch={gitBranch.name}
                          path={mdx.parent.relativePath}
                          repoType={docsLocationType}
                          text="Edit on GitLab"/> : '' }
          </TitleWrapper>
          {mdx.frontmatter.skipMetadata ? '' :
            <div css={{display: 'block'}}>
              {mdx.parent.fields ?
                <LastUpdated time={mdx.parent.fields.gitLogLatestDate}
                             name={mdx.parent.fields.gitLogLatestAuthorName}
                             email={mdx.parent.fields.gitLogLatestAuthorEmail}/> : ""}
              <ReadingTime time={mdx.timeToRead * 2}/>
            </div>
          }
        </PageTitle>
        <ContentWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </ContentWrapper>
        <div css={{padding: '50px 0'}}>
          {/*<NextPrevious mdx={mdx} nav={nav}/>*/}
        </div>
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
                metaDescription
                skipMetadata
                editable
                skipToC
            }
        }
        gitBranch {
          name
        }
        gitCommit(latest: {eq: true}) {
            hash
            date(formatString: "YYYY-MM-DD hh:mm")
        }
        allMdx {
            edges {
                node {
                    fields {
                        slug
                        title
                    }
                }
            }
        }
    }
`;
