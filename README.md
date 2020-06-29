# BooGi

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0cec88f-db01-4c57-8b8d-782e07a9f73f/deploy-status)](https://app.netlify.com/sites/boogi/deploys)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/filipowm/boogi)
![CI](https://github.com/filipowm/boogi/workflows/CI/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d0d45783a9bb47058b574a8a42d736fd)](https://www.codacy.com/manual/matfilipowicz/BooGi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=filipowm/BooGi&amp;utm_campaign=Badge_Grade)

Create awesome documentation or tutorial pages following modern look-and-feel.
Customize it to your needs

## Motivation

Core intention is to provide a great template inspired by famous Gitbook.
The content would be written by developers (and not only!) 
and what better than writing it in Markdown! And since this needs to be 
user friendly documentation, we also needed rich embeds, syntax highlighting and more
customizations. End goal is to have a powerful and simple template
which could be used by anyone who needs to have 
documentation as code and beautiful site generated out of it.

To serve all these requirements, we decided to use Gatsby + MDX (Markdown + JSX) 
to extend markdown and used a neat consistent theme like the one at 
[GitBook](https://www.gitbook.com) and deployed as docker containers.

It is a fork of https://github.com/hasura/gatsby-gitbook-starter. Intention
is to improve Gitbook to provide more features, make look-and-feel more similar
to Gitbook, make it more configurable and easier to start.

## 🔥 Features
- Write using Markdown / [MDX](https://github.com/mdx-js/mdx)
- GitBook style theme, based on https://docs.gitbook.com/
- Syntax Highlighting using Prism [`Bonus`: Code diff highlighting]
- Search Integration with [Algolia](https://www.algolia.com/) (local search capabilities
  are planned)
- Progressive Web App, Works Offline
- Google Analytics Integration
- Automatically generated sidebar navigation, table of contents, previous/next
- Additional components to make documentation beautiful and user friendly, e.g.
  emojis, badges, icons, column layout, highlights, jargon/abbreviations and more!
- Edit on Gitlab, Github or Bitbucket
- Fully customisable
- Rich embeds and live code editor using MDX
- Easy deployment: Deploy on Netlify / Now.sh / Docker
- Easily reusable in multiple projects

## 🔗 Docs and live Demo

Here's a [BooGi documentation](https://boogi.netlify.app) being
also a live demo.

## 🚀 Quickstart

Get started by running the following commands (using Gatsby CLI):

```
$ git clone git@github.com:filipowm/boogi.git
$ yarn
$ gatsby develop
```

Visit `http://localhost:8000/` to view the app.

## ☁️ Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/filipowm/boogi)
