# BooGi

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0cec88f-db01-4c57-8b8d-782e07a9f73f/deploy-status)](https://app.netlify.com/sites/boogi/deploys)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/filipowm/boogi)
![CI](https://github.com/filipowm/boogi/workflows/CI/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d0d45783a9bb47058b574a8a42d736fd)](https://www.codacy.com/manual/matfilipowicz/BooGi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=filipowm/BooGi&amp;utm_campaign=Badge_Grade)

Create awesome documentation or tutorial pages following modern look-and-feel.
Customize it to your needs

## Motivation

Goal is to give teams powerful tool which they can use to efficiently and
collaboratively share their knowledge. They can easily host it on any
infrastructure of choice or SaaS hosting like Netlify, Vercel or
GitHub / GitLab Pages. We want to provide a product, which can be customized
to (nearly) any needs, either using basic or advanced configuration options.

BooGi is inspired by popular [Gitbook](https://gitbook.com) look and feel.
It offers custom styling and components that enable building beautiful documentation
for projects and products quickly. It follows docs-as-code principles, where
you treat your documentation in the same way as your code.

To serve all these requirements, we decided to use Gatsby + MDX (Markdown + JSX) 
to extend markdown and used a neat consistent theme like the one at 
[GitBook](https://www.gitbook.com).

It is a fork of https://github.com/hasura/gatsby-gitbook-starter. Intention
is to improve this starter to provide significantly more features, make 
look-and-feel more similar to Gitbook, improve stability, performance,
make it more configurable and easier to start.

## 🔥 Features

- Write using Markdown / [MDX](https://github.com/mdx-js/mdx)
- customizing your page to match your branding and needs
- GitBook-like style theme, inspired by https://docs.gitbook.com/
- light / dark mode themes
- rich-content and rich-text features like text formatting, graphs and diagrams, 
  quotes, columnar layout, emojis, highlights, live code editor, syntax highlighting,
  external code snippets and many many more!
- search integration with [Algolia](https://www.algolia.com/) (local search capabilities
  are planned)
- Progressive Web App which can work offline
- integration with Google Analytics
- Search Engine Optimization (_SEO_) friendliness
- RSS feed
- easy way to edit content on Gitlab, Github or Bitbucket
- easy deployment on platform of your choice
- easily reusable in multiple projects

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
