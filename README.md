# BooGi

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0cec88f-db01-4c57-8b8d-782e07a9f73f/deploy-status)](https://app.netlify.com/sites/boogi/deploys)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/filipowm/boogi)
![CI](https://github.com/filipowm/boogi/workflows/CI/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d0d45783a9bb47058b574a8a42d736fd)](https://www.codacy.com/manual/matfilipowicz/BooGi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=filipowm/BooGi&amp;utm_campaign=Badge_Grade)

Create **awesome documentation** or tutorial pages with modern look-and-feel.
Customize it to your needs, run locally, deploy anywhere.

**Important** Check [boogi-cli](https://github.com/filipowm/boogi-cli) to start 
quickly, simplify your codebase, easily run locally and build you BooGi-based app. 
We recommend using `boogi-cli` instead of using `gatsby-cli` directly.

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

It is a fork of https://github.com/hasura/gatsby-gitbook-starter, however
it went through total rework and changes. We improve it to provide significantly 
more features, make look-and-feel more similar to Gitbook, improve stability, 
performance, make it more configurable and easier to start with. 

## 🔥 Features

- Write using Markdown / [MDX](https://github.com/mdx-js/mdx)
- customizing your page to match your branding and needs
- GitBook-like style theme, inspired by https://docs.gitbook.com/
- light / dark mode themes
- responsive design with mobile / tablet support
- rich-content and rich-text features like text formatting, graphs and diagrams, 
  quotes, columnar layout, emojis, highlights, live code editor, 
  syntax highlighting, external code snippets and many many more!
- draft pages
- search integration with [Algolia](https://www.algolia.com/)
- local search (search in a browser without need to integrate with Algolia)
- Progressive Web App which can work offline
- integration with Google Analytics
- full screen mode
- Search Engine Optimization (_SEO_) friendliness
- RSS feed
- easy way to edit content on Gitlab, Github or Bitbucket
- custom CLI to easily initialize and develop BooGi app
- easy deployment on platform of your choice

## 🔗 Docs and live Demo

Here's a [BooGi documentation](https://boogi.netlify.app) being
also a live demo.

## 🚀 Quickstart

### Using `boogi-cli` (recommended)

You need to have `boogi-cli` installed: `npm install -g boogi-cli`.

1. Initialize BooGi project (config wizard will help you to 
   set it up!) in current directory:
   ```bash
   boogi init
   ```

2. Run your app in development mode with live reload
   ```bash
   boogi develop
   ```

3. Build you app package ready for deployment
   ```bash
   boogi build
   ```

### Using `gatsby-cli`

You need to have `gatsby-cli` installed: `npm install -g gatsby-cli`.

Get started by running the following commands (using Gatsby CLI):

```
$ git clone git@github.com:filipowm/boogi.git
$ yarn
$ gatsby develop
```

Visit `http://localhost:8000/` to view the app.

## ☁️ Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/filipowm/boogi)
